import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
  async _validatePassword(password: string) {
    const regex = /^(?=.*\d)(?=.*\W+)(?=.*[A-Z])(?=.*[a-z]).{8,}$/;

    if (!regex.test(password)) {
      if (password.length < 8) {
        return {
          success: false,
          message: 'The password must be at least 8 characters long.',
        };
      }

      if (!/[A-Z]/.test(password)) {
        return {
          success: false,
          message: 'The password must contain at least one uppercase letter.',
        };
      }
      if (!/[a-z]/.test(password)) {
        return {
          success: false,
          message: 'The password must contain at least one lowercase letter.',
        };
      }
      if (!/\d/.test(password)) {
        return {
          success: false,
          message: 'The password must contain at least one digit.',
        };
      }
      if (!/\W/.test(password)) {
        return {
          success: false,
          message: 'The password must contain at least one special character.',
        };
      }
    } else {
      return {
        success: true,
        message: 'The password is valid.',
      };
    }
  }

  async _hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async _verificationCodeGenerate(length: number): Promise<number> {
    const randomNum: any = (
      Math.pow(10, length)
        .toString()
        .slice(length - 1) +
      Math.floor(Math.random() * Math.pow(10, length) + 1).toString()
    ).slice(-length);
    return Number(randomNum);
  }

  async _doesPasswordMatch(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async _getUserId(userId: number) {
    return {
      id: userId,
    };
  }
}
