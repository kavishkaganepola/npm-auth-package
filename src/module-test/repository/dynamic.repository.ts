import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { EntityTarget } from 'typeorm/common/EntityTarget';

@Injectable()
export class DynamicRepository<T> {
  constructor(
    @Inject('ENTITY') private readonly entity: EntityTarget<T>,
    private dataSource: DataSource
  ) {}

  get repository(): Repository<T> {
    return this.dataSource.getRepository(this.entity);
  }
}
