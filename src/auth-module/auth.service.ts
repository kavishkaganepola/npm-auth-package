import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './repository/auth.repository';
import { RegisterType } from './types/user.types';
import * as Redis from 'ioredis';

@Injectable()
export class AuthService {
  private readonly redisClient: Redis.Redis;
  constructor(
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {    
    this.redisClient = new Redis({
    host: 'localhost', // Redis server host
    port: 6379,        // Redis server port
  });}

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
