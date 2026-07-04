import { Injectable } from '@nestjs/common';
import { signinDto, signupDto } from './dto/authentication.dto';
import { InjectModel } from '@nestjs/mongoose';
import { user } from 'src/common/model';
import { Model } from 'mongoose';
import { IUser } from 'src/common/interfaces';

@Injectable()
export class AuthenticationService {
  constructor(@InjectModel(user.name) private readonly model: Model<IUser>) {}

  async signup(body: signupDto) {
    const users = await this.model.create(body);
    return users;
  }

  signin(body: signinDto) {
    return { message: 'signin done', body };
  }
}
