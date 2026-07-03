// import {
//   ArgumentMetadata,
//   BadRequestException,
//   Injectable,
//   PipeTransform,
// } from '@nestjs/common';
// import { ZodType } from 'zod';

// @Injectable()
// export class CustomValidationPipePipe<T> implements PipeTransform {
//   constructor(private schema: ZodType) {}

//   transform(value: any, metadata: ArgumentMetadata) {
//     const dataValue = this.schema.safeParse(value);
//     if (!dataValue.success) {
//       throw new BadRequestException('invalid inputs');
//     }

//     if (value.password != value.confirmpassword) {
//       throw new BadRequestException('password not match');
//     }
//   }
// }
