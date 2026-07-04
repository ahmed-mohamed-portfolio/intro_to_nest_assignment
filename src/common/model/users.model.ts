import {
  MongooseModule,
  Prop,
  Schema,
  SchemaFactory,
  Virtual,
} from '@nestjs/mongoose';
import { IUser } from '../interfaces';
import { GenderEnum, ProviderEnum, RoleEnum } from '../enums';
import { HydratedDocument } from 'mongoose';

@Schema(
  //i can add schema options
  //example :
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strict: true,
    strictQuery: true,
    collection: 'test_APP_USERS',
  },
)
export class user implements IUser {
  @Prop({ type: String, required: true })
  firstName!: string;

  @Prop({ type: String, required: true })
  lastName!: string;

  @Virtual({
    set: function (this: HydratedDocument<IUser>, value: string) {
      let [firstName, lastName] = value.split(' ');
      this.set({ firstName, lastName });
    },
    get: function (this: any) {
      return `${this.firstName} ${this.lastName}`;
    },
  })
  userName?: string | undefined;

  @Prop({ type: String, required: true, unique: true })
  email!: string;
  @Prop({ type: String, required: false })
  phone?: string;

  @Prop({ type: String, required: false })
  profilePic?: string;
  @Prop([{ type: String, required: false }])
  profileCoverPic?: string[];

  @Prop({
    type: String,
    //   required: function () {
    //     return this.provider === ProviderEnum.system;
    //   },
  })
  password?: string;
  @Prop({ type: Number, default: GenderEnum.male })
  gender?: GenderEnum;

  @Prop({ type: Number, default: RoleEnum.user })
  role!: RoleEnum;

  @Prop({ type: Number, default: ProviderEnum.system })
  provider!: ProviderEnum;

  @Prop({ type: Boolean })
  confirmEmail?: boolean;
}

export const userSchema = SchemaFactory.createForClass(user);
export const userModel = MongooseModule.forFeature([
  { name: user.name, schema: userSchema },
]);
