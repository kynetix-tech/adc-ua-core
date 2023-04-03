import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from '../service/post.service';
import { PostFormatter } from '../formatter/post.formatter';
import { PostResponse } from '../dto/responce.dto';
import { RequestWithAuth } from '../types/interfaces';
import { PostCreateRequest } from '../dto/request.dto';

@ApiTags('Post')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('authorization')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postFormatter: PostFormatter,
  ) {}

  @Get('all/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: PostResponse, isArray: true })
  public async getAllByUserId(@Param('userId') userId: string) {
    const posts = await this.postService.getAllItemsByUserId(userId);

    return this.postFormatter.toPostsResponse(posts);
  }

  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: Number })
  public async createPost(
    @Req() { user }: RequestWithAuth,
    @Body() body: PostCreateRequest,
  ) {
    const { auth0Id } = user;
    const newPostId = await this.postService.createNewPost(body, auth0Id);

    return newPostId;
  }
}
