import { Module } from '@nestjs/common';
import { PrandsService } from './prands.service';
import { PrandsController } from './prands.controller';

@Module({
  controllers: [PrandsController],
  providers: [PrandsService],
})
export class PrandsModule {}
