import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB_DATABASE'),
        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () =>
            console.log('mongoDb database connected'),
          );
          connection.on('open', () => console.log('mongoDb database open'));
          connection.on('disconnected', () =>
            console.log('mongoDb database disconnected'),
          );
          connection.on('reconnected', () =>
            console.log('mongoDb database reconnected'),
          );
          connection.on('disconnecting', () =>
            console.log('mongoDb database disconnecting'),
          );

          return connection;
        },
      }),
      inject: [ConfigService],
    }),

    AuthenticationModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
