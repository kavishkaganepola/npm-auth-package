import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  // Get user details ( public details only )
  _validatePassword(password: string) {
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

  async findByUsername(username: string): Promise<any> {
      return await this.userRepository.findOneBy({ username });
  }

  // hashing the password
  async _hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  // Code generate ( 6 numbers length ) for verify the user
  _verificationCodeGenerate(length: number): number {
    const randomNum: any = (
      Math.pow(10, length)
        .toString()
        .slice(length - 1) +
      Math.floor(Math.random() * Math.pow(10, length) + 1).toString()
    ).slice(-length);
    return Number(randomNum);
  }

  // Check password match
  async _doesPasswordMatch(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
