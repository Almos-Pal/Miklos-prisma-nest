import { Injectable } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';

@Injectable()
export class ToyService {
  create(createToyDto: CreateToyDto) {
    return 'This action adds a new toy';
  }

  findAll() {
    return `This action returns all toy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} toy`;
  }

  update(id: number, updateToyDto: UpdateToyDto) {
    return `This action updates a #${id} toy`;
  }

  remove(id: number) {
    return `This action removes a #${id} toy`;
  }
}
