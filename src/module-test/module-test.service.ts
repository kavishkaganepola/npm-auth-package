import { Injectable, Inject } from '@nestjs/common';
import { TestDto } from './dtos/test.dto';

@Injectable()
export class ModuleTestService {

	constructor(
		@Inject('MODULE_TEST') 
		private testDto: TestDto
	) 
	{}

	async IsUsingSword(): Promise<boolean> {
		return this.testDto.first_name == 'Sword';
	}
}