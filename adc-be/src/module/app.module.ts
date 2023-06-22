import { Module } from '@nestjs/common';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
