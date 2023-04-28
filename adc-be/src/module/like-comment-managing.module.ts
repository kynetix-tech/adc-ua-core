import { Module } from '@nestjs/common';
import { LikeCommentManagingController } from '../controller/like-comment-managing.controller';
import { LikeCommentManagingService } from '../service/like-comment-managing.service';
import { LikeRepository } from '../repository/like.repository';
import { LikeCommentManagingFormatter } from '../formatter/like-comment-managing.formatter';

@Module({
  controllers: [LikeCommentManagingController],
  providers: [
    LikeCommentManagingService,
    LikeCommentManagingFormatter,
    LikeRepository,
  ],
})
export class LikeCommentManagingModule {}
