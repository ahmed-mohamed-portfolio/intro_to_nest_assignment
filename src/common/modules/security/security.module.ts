import { Module } from '@nestjs/common';
import { securityService } from './security.service';

@Module({
  providers: [securityService],
  exports: [securityService],
})
export class securityModule {}
