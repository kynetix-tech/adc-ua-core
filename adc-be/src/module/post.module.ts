import { Module } from '@nestjs/common';
import { PostController } from '../controller/post.controller';
import { PostService } from '../service/post.service';
import { PostRepository } from '../repository/post.repository';
import { PostFormatter } from '../formatter/post.formatter';
import { CarSpecificationFormatter } from '../formatter/car-specification.formatter';
import { UserFormatter } from '../formatter/user.formatter';
import { MulterModule } from '@nestjs/platform-express';
import { CheckSumRepository } from '../repository/check-sum-repository.service';

@Module({
  imports: [
    MulterModule.register({
      fileFilter: (req, file, cb) =>
        !file.mimetype.includes('image') ? cb(null, false) : cb(null, true),
    }),
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PostRepository,
    CheckSumRepository,
    PostFormatter,
    CarSpecificationFormatter,
    UserFormatter,
  ],
})
export class PostModule {}
