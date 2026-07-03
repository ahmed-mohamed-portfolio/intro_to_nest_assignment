import { Injectable } from '@nestjs/common';
import { signinDto, signupDto } from './dto/authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor() {}

  signup(body: signupDto) {
    return { message: 'signup done', body };
  }

  signin(body: signinDto) {
    return { message: 'signin done', body };
  }
}
