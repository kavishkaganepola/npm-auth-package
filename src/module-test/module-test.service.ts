import { Injectable, Inject } from '@nestjs/common';
import { TestDto } from './dtos/test.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class ModuleTestService {
  constructor(
    @Inject('MODULE_TEST')
    private testDto: TestDto,
    private userRepository: UserRepository
  ) {}

  async IsUsingSword(): Promise<boolean> {
    return this.testDto.first_name == 'Sword';
  }

  async signUp(password: string, verification_code_size: number): Promise<any> {
    const isPasswordValid = this.userRepository._validatePassword(password);

    // Hashing the password
    if (!isPasswordValid.success) {
      return {
        success: true,
        message: isPasswordValid.message,
      };
    }

    const hashed_password = await this.userRepository._hashPassword(password);

    // Generate a verification code for user validations
    const verification_code =
      this.userRepository._verificationCodeGenerate(verification_code_size);

    return {
      success: true,
      hashed_password: hashed_password,
      verification_code: verification_code,
    };
  }
}
