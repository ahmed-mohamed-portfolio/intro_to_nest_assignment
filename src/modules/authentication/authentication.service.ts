import { ConflictException, Injectable } from '@nestjs/common';
import { signinDto, signupDto } from './dto/authentication.dto';
import { IUser } from 'src/common/interfaces';
import { userRepository } from 'src/common/repository';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userRepository: userRepository) {}

  async signup(body: signupDto): Promise<IUser> {
    const checkUserExist = await this.userRepository.findOne({
      email: body.email,
    });
    if (checkUserExist) {
      throw new ConflictException('email exist');
    }
    const users = await this.userRepository.create(body);
    users.password = ' ';
    return users;
  }

  signin(body: signinDto) {
    return { message: 'signin done', body };
  }
}
