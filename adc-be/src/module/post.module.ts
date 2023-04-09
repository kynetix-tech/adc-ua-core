import { Module } from '@nestjs/common';
import { PostController } from '../controller/post.controller';
import { PostService } from '../service/post.service';
import { PostRepository } from '../repository/post.repository';
import { PostFormatter } from '../formatter/post.formatter';
import { CarSpecificationFormatter } from '../formatter/car-specification.formatter';
import { UserFormatter } from '../formatter/user.formatter';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RequestWithAuth } from '../types/interfaces';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: configService.get<string>('media.storageDir'),
          filename: (req: RequestWithAuth, file, cb) => {
            const date = Date.now().toString();
            return cb(
              null,
              `${req.user.auth0Id}-${date}${extname(file.originalname)}`,
            );
          },
        }),
        fileFilter: (req, file, cb) =>
          !file.mimetype.includes('image') ? cb(null, false) : cb(null, true),
      }),
    }),
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PostRepository,
    PostFormatter,
    CarSpecificationFormatter,
    UserFormatter,
  ],
})
export class PostModule {}
