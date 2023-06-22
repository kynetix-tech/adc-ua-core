import { Module } from '@nestjs/common';
import { LikeCommentManagingController } from '../controller/like-comment-managing.controller';
import { LikeCommentManagingService } from '../service/like-comment-managing.service';
import { LikeRepository } from '../repository/like.repository';
import { LikeCommentManagingFormatter } from '../formatter/like-comment-managing.formatter';
import { CommentRepository } from '../repository/comment.repository';
import { UserFormatter } from '../formatter/user.formatter';

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
