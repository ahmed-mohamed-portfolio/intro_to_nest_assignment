// import { z } from 'zod';
// import { signinSchema, signupSchema } from '../authentication.validation';

import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

// export type signinDto = z.infer<typeof signinSchema.body>;

// export type signupDto = z.infer<typeof signupSchema.body>;

import { IsMatch } from 'src/common/decorators';

export class signinDto {
  @IsEmail({}, { message: 'email not valid' })
  email!: string;

  @IsStrongPassword()
  password!: string;

  @ValidateIf((data: any) => {
    return Boolean(data.password);
  })
  @IsMatch(['password'])
  confirmpassword!: string;
}

export class signupDto extends signinDto {
  @MinLength(4)
  @MaxLength(20)
  firstName!: string;

  @MinLength(4)
  @MaxLength(20)
  lastName!: string;

  @IsOptional()
  @IsString()
  phone?: string;
  @Min(18)
  age!: number;
}
