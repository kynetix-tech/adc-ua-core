import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from '../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../config/interface';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from './user.module';
import { CarSpecificationModule } from './car-specification.module';
import { PostModule } from './post.module';
import { PublicStaticModule } from './public-static.module';
import { LikeCommentManagingModule } from './like-comment-managing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    // TODO: Remove
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) =>
    //     configService.get<DatabaseConfig>('db'),
    // }),
    MongooseModule.forRoot(
      'mongodb://localhost:27017,127.0.0.1:27018/adc?replicaSet=rs0',
    ),
    AuthModule,
    UserModule,
    CarSpecificationModule,
    PostModule,
    PublicStaticModule,
    LikeCommentManagingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
