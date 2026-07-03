import { PartialType } from '@nestjs/mapped-types';
import { CreatePrandDto } from './create-prand.dto';

export class UpdatePrandDto extends PartialType(CreatePrandDto) {}
