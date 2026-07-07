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
import { BadRequestException } from '@nestjs/common';
import { securityModule } from '../modules/security/security.module';
import { securityService } from '../modules/security/security.service';

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
// export const userModel = MongooseModule.forFeature([
//   { name: user.name, schema: userSchema },
// ]);

export const userModel = MongooseModule.forFeatureAsync([
  {
    name: user.name,
    imports: [securityModule],
    useFactory: (securityService: securityService) => {
      /*
userSchema.pre(["deleteOne", "findOneAndDelete"], function () {

    if (this.getQuery().force == true) {
        this.setQuery({
            ...this.getQuery(),
        })
    } else {
        this.setQuery({
            ...this.getQuery(),
            deletedAt: { $exists: true }
        })
    }

})




userSchema.pre(["updateOne", "findOneAndUpdate"], function () {

    const update = this.getUpdate() as HydratedDocument<IUser>

    if (update.deletedAt) {
        this.getQuery().paranoid = true
        this.setUpdate({
            ...this.getUpdate(),
            $unset: { restoredAt: 1 }
        })
    }

    if (update.restoredAt) {
        this.setQuery({
            ...this.getQuery(),
            paranoid: false,
            deletedAt: { $exists: true }
        })
        this.setUpdate({
            ...this.getUpdate(),
            $unset: { deletedAt: 1 }
        })
    }

    if (this.getQuery().paranoid == false) {
        this.setQuery({
            ...this.getQuery(),
        })
    } else {
        this.setQuery({
            ...this.getQuery(),
            deletedAt: { $exists: false }
        })
    }

    console.log(this.getQuery());

})






userSchema.pre(["find", "findOne"], function () {

    if (this.getQuery().paranoid == false) {
        this.setQuery({
            ...this.getQuery(),
        })
    } else {
        this.setQuery({
            ...this.getQuery(),
            deletedAt: { $exists: false }
        })
    }

})






    */

      userSchema.pre(
        'save',
        async function (this: HydratedDocument<IUser> & { wasNew: boolean }) {
          this.wasNew = this.isNew;

          if (this.isModified('password')) {
            this.password = await securityService.generateHash({
              plaintext: this.password as string,
            });
          }

          if (this.phone && this.isModified('phone')) {
            this.phone = await securityService.generateEncryption(this.phone);
          }
        },
      );

      //hook check if password come with gmail
      userSchema.pre('validate', function () {
        if (this.password && this.provider == ProviderEnum.google) {
          throw new BadRequestException('Google account cannot hold password');
        }
      });

      return userSchema;
    },
    inject: [securityService],
  },
]);
