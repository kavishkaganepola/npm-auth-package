import { Module, DynamicModule } from '@nestjs/common';
import { ModuleTestService } from './module-test.service';
import { TestDto } from './dtos/test.dto';
import { UserRepository } from './repository/user.repository';

@Module({})
export class ModuleTestModule {
  static register(testDto: TestDto): DynamicModule {
    return {
      module: ModuleTestModule,
      providers: [
        {
          provide: 'MODULE_TEST',
          useValue: testDto,
        },
        ModuleTestService,
        UserRepository
      ],
      exports: [ModuleTestService],
    };
  }
}
