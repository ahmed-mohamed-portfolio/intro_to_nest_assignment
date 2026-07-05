import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { userModel } from 'src/common/model';
import { userRepository } from 'src/common/repository';

@Module({
  imports: [userModel],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, userRepository],
})
export class AuthenticationModule {}
