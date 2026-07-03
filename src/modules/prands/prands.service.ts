import { Injectable } from '@nestjs/common';
import { CreatePrandDto } from './dto/create-prand.dto';
import { UpdatePrandDto } from './dto/update-prand.dto';

@Injectable()
export class PrandsService {
  create(createPrandDto: CreatePrandDto) {
    return 'This action adds a new prand';
  }

  findAll() {
    return `This action returns all prands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prand`;
  }

  update(id: number, updatePrandDto: UpdatePrandDto) {
    return `This action updates a #${id} prand`;
  }

  remove(id: number) {
    return `This action removes a #${id} prand`;
  }
}
