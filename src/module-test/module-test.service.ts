import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class ModuleTestService {
  constructor(
    private userRepository: UserRepository
  ) {}

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
