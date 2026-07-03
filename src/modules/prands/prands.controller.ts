import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrandsService } from './prands.service';
import { CreatePrandDto } from './dto/create-prand.dto';
import { UpdatePrandDto } from './dto/update-prand.dto';

@Controller('prands')
export class PrandsController {
  constructor(private readonly prandsService: PrandsService) {}

  @Post()
  create(@Body() createPrandDto: CreatePrandDto) {
    return this.prandsService.create(createPrandDto);
  }

  @Get()
  findAll() {
    return this.prandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prandsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrandDto: UpdatePrandDto) {
    return this.prandsService.update(+id, updatePrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prandsService.remove(+id);
  }
}
