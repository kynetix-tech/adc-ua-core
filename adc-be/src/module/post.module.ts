import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PostController } from '../controller/post.controller';
import { CarSpecificationFormatter } from '../formatter/car-specification.formatter';
import { LikeCommentManagingFormatter } from '../formatter/like-comment-managing.formatter';
import { PostFormatter } from '../formatter/post.formatter';
import { UserFormatter } from '../formatter/user.formatter';
import { CheckSumRepository } from '../repository/check-sum-repository.service';
import { PostRepository } from '../repository/post.repository';
import { PostService } from '../service/post.service';

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
    LikeCommentManagingFormatter,
  ],
})
export class PostModule {}
