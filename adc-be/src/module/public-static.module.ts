import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: configService.get<string>('media.storageDir'),
          serveRoot: configService.get<string>('media.servePath'),
          exclude: ['/api*'],
        },
      ],
    }),
  ],
})
export class PublicStaticModule {}
