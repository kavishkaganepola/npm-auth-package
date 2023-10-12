import { Inject, Injectable, Provider } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './repository/auth.repository';
import { RegisterType } from './types/user.types';
import Redis from 'ioredis';
import { ConfigDto } from './dtos/config.dto';

@Injectable()
export class AuthService {
  private readonly redisClient: Redis;
  constructor(
    @Inject('CONFIG_DTO')
    private configDTO: ConfigDto,
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
    private jwtService: JwtService
  ) {
    this.redisClient = new Redis({
      host: this.configDTO.REDIS_HOST,
      port: this.configDTO.REDIS_PORT,
      password: this.configDTO.REDIS_PASSWORD,
    });
  }

  async signUp(sign_up_dto: any, verification_code_size: number): Promise<any> {
    const is_password_valid = await this.authRepository._validatePassword(
      sign_up_dto.password
    );

    if (!is_password_valid.success) {
      return {
        success: false,
        message: is_password_valid.message,
      };
    }

    const existing_email_user = await this.userRepository.findByEmail(
      sign_up_dto.email
    );

    if (existing_email_user) {
      const { register_type } = existing_email_user;

      if (register_type === RegisterType.GOOGLE) {
        return {
          success: false,
          message:
            'This email address has already been used to sign up using Google. Please sign in with your Google account or use a different email address to register.',
        };
      }
      return {
        success: false,
        message:
          'This email address is already in use. Please use a different email or sign in with your existing account.',
      };
    }

    const hashed_password = await this.authRepository._hashPassword(
      sign_up_dto.password
    );

    sign_up_dto.password = hashed_password;

    const verification_code =
      await this.authRepository._verificationCodeGenerate(
        verification_code_size
      );

    sign_up_dto.verification_code = verification_code;

    const new_user = await this.userRepository.createUser(sign_up_dto);

    const user_id = this.authRepository._getUserId(new_user.id);

    const sign_up_jwt_token = await this.jwtService.signAsync({
      type: 'access',
      user_id,
    });

    const mail_jwt_token = await this.jwtService.signAsync({
      type: 'verification',
      user_id,
    });

    await this.redisClient.sadd(
      'whitelisted_access_tokens_npm',
      sign_up_jwt_token
    );
    await this.redisClient.sadd('whitelisted_access_tokens_npm', mail_jwt_token);

    return {
      success: true,
      user: new_user,
      sign_up_jwt_token: sign_up_jwt_token,
      mail_jwt_token: mail_jwt_token,
    };
  }

  async getUserByUserName(username: string) {
    const jwt = await this.jwtService.signAsync({ type: 'access', username });
    const user = await this.userRepository.findByUsername(username);
    return {
      jwt: jwt,
      user: user,
    };
  }
}
