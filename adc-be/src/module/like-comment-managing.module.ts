import { Module } from '@nestjs/common';
import { LikeCommentManagingController } from '../controller/like-comment-managing.controller';
import { LikeCommentManagingService } from '../service/like-comment-managing.service';
import { LikeRepository } from '../repository/like.repository';
import { LikeCommentManagingFormatter } from '../formatter/like-comment-managing.formatter';
import { CommentRepository } from '../repository/comment.repository';
import { UserFormatter } from '../formatter/user.formatter';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from '../schema/like.schema';
import { Post, PostSchema } from '../schema/post.schema';
import { User, UserSchema } from '../schema/user.schema';
import { UserService } from '../service/user.service';
import { UserRepository } from '../repository/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [LikeCommentManagingController],
  providers: [
    LikeCommentManagingService,
    LikeCommentManagingFormatter,
    LikeRepository,
    CommentRepository,
    UserFormatter,
    UserService,
    UserRepository,
  ],
})
export class LikeCommentManagingModule {}
