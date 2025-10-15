import { Module } from '@nestjs/common';
import { LikeCommentManagingController } from '../controller/like-comment-managing.controller';
import { LikeCommentManagingFormatter } from '../formatter/like-comment-managing.formatter';
import { UserFormatter } from '../formatter/user.formatter';
import { CommentRepository } from '../repository/comment.repository';
import { LikeRepository } from '../repository/like.repository';
import { LikeCommentManagingService } from '../service/like-comment-managing.service';

@Module({
  controllers: [LikeCommentManagingController],
  providers: [
    LikeCommentManagingService,
    LikeCommentManagingFormatter,
    LikeRepository,
    CommentRepository,
    UserFormatter,
  ],
})
export class LikeCommentManagingModule {}
