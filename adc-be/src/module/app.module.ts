import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { configuration } from '../config/configuration';
import { DatabaseConfig } from '../config/interface';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { CarSpecificationModule } from './car-specification.module';
import { LikeCommentManagingModule } from './like-comment-managing.module';
import { PostModule } from './post.module';
import { PublicStaticModule } from './public-static.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get<DatabaseConfig>('db'),
    }),
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
