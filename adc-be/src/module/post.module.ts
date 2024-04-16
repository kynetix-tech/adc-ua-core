import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from '../controller/post.controller';
import { PostService } from '../service/post.service';
import { PostRepository } from '../repository/post.repository';
import { PostFormatter } from '../formatter/post.formatter';
import { CarSpecificationFormatter } from '../formatter/car-specification.formatter';
import { UserFormatter } from '../formatter/user.formatter';
import { MulterModule } from '@nestjs/platform-express';
import { CheckSumRepository } from '../repository/check-sum-repository.service';
import { LikeCommentManagingFormatter } from '../formatter/like-comment-managing.formatter';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../schema/post.schema';
import { Checksum, ChecksumSchema } from '../schema/checksum.schema';
import { UserSchema, User } from '../schema/user.schema';
import { UserService } from '../service/user.service';
import { UserRepository } from '../repository/user.repository';
import { LikeRepository } from '../repository/like.repository';
import { Like, LikeSchema } from '../schema/like.schema';
import { CarModel, CarModelSchema } from '../schema/car-model.schema';

@Module({
  imports: [
    MulterModule.register({
      fileFilter: (req, file, cb) =>
        !file.mimetype.includes('image') ? cb(null, false) : cb(null, true),
    }),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([
      { name: Checksum.name, schema: ChecksumSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    MongooseModule.forFeature([
      { name: CarModel.name, schema: CarModelSchema },
    ]),
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
    UserService,
    UserRepository,
    LikeRepository,
  ],
})
export class PostModule {}
