
import { NestFactory } from '@nestjs/core';
import { ModuleTestModule } from './module-test/module-test.module';

async function bootstrap() {
  const app = await NestFactory.create(ModuleTestModule);
}
bootstrap();
