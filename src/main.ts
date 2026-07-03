import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => {
    console.log(`server run on port ${PORT}`);
  });
}
bootstrap().catch((error) => {
  console.log(error);
});
