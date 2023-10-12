import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import { DynamicRepository } from './dynamic.repository';

@Injectable()
export class UserRepository {
  constructor(private dataSource: DataSource) {}

  async findByUsername(username: string): Promise<any> {
    const dynamicUserRepository = createDynamicRepository(
      'User',
      this.dataSource
    );
    return await dynamicUserRepository.repository.findOneBy({ username });
  }

    async findByEmail(email: string): Promise<any> {
      try {
        const dynamicUserRepository = createDynamicRepository(
          'User',
          this.dataSource
        );
        return await dynamicUserRepository.repository.findOneBy({ email });
      } catch (err) {
        throw new Error(`Find By Email User Error: ${err}`);
      }
    }

    async createUser(createUserDto: any): Promise<any> {
      try {
        const dynamicUserRepository = createDynamicRepository(
          'User',
          this.dataSource
        );

        const dynamicRoleRepository = createDynamicRepository(
          'Role',
          this.dataSource
        );
  
        const role = await dynamicRoleRepository.repository.findOneBy({
          name: 'user',
        });

        createUserDto.role = role;
  
        const user = await dynamicUserRepository.repository.create(createUserDto);
  
        const createdUser = await dynamicUserRepository.repository.save(user);
  
        return createdUser;
      } catch (err) {
        throw new Error(`Create User Error: ${err}`);
      }
    }
}

export function createDynamicRepository<T>(
  entity: EntityTarget<T>,
  dataSource: DataSource
): DynamicRepository<T> {
  return new DynamicRepository(entity, dataSource);
}
