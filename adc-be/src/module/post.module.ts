import { Module } from '@nestjs/common';
import { PostController } from '../controller/post.controller';
import { PostService } from '../service/post.service';
import { PostRepository } from '../repository/post.repository';
import { PostFormatter } from '../formatter/post.formatter';
import { CarSpecificationFormatter } from '../formatter/car-specification.formatter';
import { UserFormatter } from '../formatter/user.formatter';

@Module({
  imports: [],
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
