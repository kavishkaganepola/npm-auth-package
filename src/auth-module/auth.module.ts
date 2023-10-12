import { Module, DynamicModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigDto } from './dtos/config.dto';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './repository/auth.repository';

@Module({})
export class AuthModule {
  static register(configDto: ConfigDto): DynamicModule {
    const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, JWT_SECRET, JWT_EXPIRATION } = configDto;
    return {
      module: AuthModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: DB_HOST,
          port: DB_PORT,
          username: DB_USERNAME,
          password: DB_PASSWORD,
          database: DB_NAME,
          autoLoadEntities: true,
        }),
        JwtModule.register({
            secret: JWT_SECRET,
            signOptions: {
              expiresIn: JWT_EXPIRATION,
            },
          }),
      ],
      providers: [AuthService, UserRepository, AuthRepository],
      exports: [AuthService],
    };
  }
}
