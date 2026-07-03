// import { z } from 'zod';
// import { signinSchema, signupSchema } from '../authentication.validation';

import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

// export type signinDto = z.infer<typeof signinSchema.body>;

// export type signupDto = z.infer<typeof signupSchema.body>;

export class signinDto {
  @IsEmail({}, { message: 'email not valid' })
  email!: string;

  @IsStrongPassword()
  password!: string;

  @IsNotEmpty()
  confirmpassword!: string;
}

export class signupDto extends signinDto {
  @MinLength(4)
  @MaxLength(20)
  firstName!: string;

  @MinLength(4)
  @MaxLength(20)
  lastName!: string;

  @Min(18)
  age!: number;
}
