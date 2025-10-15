import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../common/const';
import {
  CommentDeleteRequest,
  CommentGetCreateRequest,
  LikeRequest,
} from '../dto/request.dto';
import {
  CommentCreateResponse,
  CommentViewResponse,
  LikeResponse,
} from '../dto/responce.dto';
import { LikeCommentManagingFormatter } from '../formatter/like-comment-managing.formatter';
import { LikeCommentManagingService } from '../service/like-comment-managing.service';
import { RequestWithAuth } from '../types/interfaces';

@Controller('like-comment-manage')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('authorization')
@ApiTags('LikeCommentManage')
export class LikeCommentManagingController {
  constructor(
    public readonly likeCommentManagingService: LikeCommentManagingService,
    public readonly likeCommentManagingFormatter: LikeCommentManagingFormatter,
  ) {}

  @Post('like')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: LikeResponse })
  public async addLike(
    @Req() { user }: RequestWithAuth,
    @Body() body: LikeRequest,
  ): Promise<LikeResponse> {
    const likeResponse = await this.likeCommentManagingService.addLike(
      body,
      user.auth0Id,
    );

    return this.likeCommentManagingFormatter.toLikeResponse(likeResponse);
  }

  @Delete('like')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  public async deleteLike(
    @Req() { user }: RequestWithAuth,
    @Body() body: LikeRequest,
  ): Promise<void> {
    return await this.likeCommentManagingService.deleteLike(body, user.auth0Id);
  }

  @Post('comment')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: CommentCreateResponse })
  public async createComment(
    @Req() { user }: RequestWithAuth,
    @Body() body: CommentGetCreateRequest,
  ): Promise<CommentCreateResponse> {
    const commentId = await this.likeCommentManagingService.createComment(
      body,
      user.auth0Id,
    );

    return this.likeCommentManagingFormatter.toCommentCreateResponce(commentId);
  }

  @Delete('comment')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  public async deleteComment(
    @Req() { user }: RequestWithAuth,
    @Body() body: CommentDeleteRequest,
  ) {
    const { auth0Id } = user;

    return this.likeCommentManagingService.deleteComment(body, auth0Id);
  }

  @Get('comment/newest')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CommentViewResponse,
    isArray: true,
  })
  public async getNewestComments(
    @Query('postId') postId: number,
    @Query('limit') limit: number = DEFAULT_LIMIT,
    @Query('offset') offset: number = DEFAULT_OFFSET,
  ): Promise<CommentViewResponse[]> {
    const comments =
      await this.likeCommentManagingService.getNewestCommentsWithLimit(
        postId,
        limit,
        offset,
      );

    return this.likeCommentManagingFormatter.toCommentsViewResponse(comments);
  }
}
