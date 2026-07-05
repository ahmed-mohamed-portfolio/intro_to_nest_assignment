import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../interfaces';
import { DatabaseRepository } from './base.repository';
import { user } from '../model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class userRepository extends DatabaseRepository<IUser> {
  constructor(@InjectModel(user.name) protected readonly model: Model<IUser>) {
    super(model);
  }
}
