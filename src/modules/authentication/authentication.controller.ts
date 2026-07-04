import { AuthenticationService } from './authentication.service';
import {
  Body,
  Controller,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { signinDto, signupDto } from './dto/authentication.dto';
@UsePipes(
  new ValidationPipe({
    stopAtFirstError: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }),
)
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/signup')
  async signup(
    // @Body('age', ParseIntPipe) age: number,
    // @Body(new CustomValidationPipePipe<signupDto>(signupSchema.body))
    // body: signupDto,

    @Body(
      new ValidationPipe({
        stopAtFirstError: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    Body: signupDto,
    @Query() Query: any,
    @Param() Param: any,
  ) {
    console.log(Body);

    const result = await this.authenticationService.signup(Body);
    return { message: 'done', result };
    // return result;
  }

  @Post('signin')
  login(
    // @Body(new CustomValidationPipePipe<signinDto>(signinSchema.body))
    // body: signinDto,
    @Body(
      new ValidationPipe({
        stopAtFirstError: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    Body: signinDto,
  ) {
    console.log(Body);

    return { message: 'done', Body };
    // const result = this.authenticationService.signin(body);
    // return result;
  }
}
