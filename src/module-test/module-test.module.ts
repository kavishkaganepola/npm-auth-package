import { Module, DynamicModule } from '@nestjs/common';
import { ModuleTestService } from './module-test.service';
import { DatabaseDto } from './dtos/test.dto';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class ModuleTestModule {
  static register(databaseDto: DatabaseDto): DynamicModule {
    const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = databaseDto;
    return {
      module: ModuleTestModule,
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
      ],
      providers: [ModuleTestService, UserRepository],
      exports: [ModuleTestService],
    };
  }
}
