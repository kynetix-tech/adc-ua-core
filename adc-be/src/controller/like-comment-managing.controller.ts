import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CommentCreateResponse,
  CommentViewResponse,
  LikeResponse,
} from '../dto/responce.dto';
import { RequestWithAuth } from '../types/interfaces';
import {
  CommentGetCreateRequest,
  CommentDeleteRequest,
  LikeRequest,
} from '../dto/request.dto';
import { LikeCommentManagingService } from '../service/like-comment-managing.service';
import { LikeCommentManagingFormatter } from '../formatter/like-comment-managing.formatter';
import { AuthGuard } from '@nestjs/passport';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../common/const';
import { UserService } from '../service/user.service';

@Controller('like-comment-manage')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('authorization')
@ApiTags('LikeCommentManage')
export class LikeCommentManagingController {
  constructor(
    public readonly likeCommentManagingService: LikeCommentManagingService,
    public readonly likeCommentManagingFormatter: LikeCommentManagingFormatter,
    private readonly userService: UserService,
  ) {}

  @Post('like')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: LikeResponse })
  public async addLike(
    @Req() { user: userJwtInfo }: RequestWithAuth,
    @Body() body: LikeRequest,
  ): Promise<LikeResponse> {
    const user = await this.userService.getByAuth0Id(userJwtInfo.auth0Id);
    const likeResponse = await this.likeCommentManagingService.addLike(
      body,
      user.id,
    );

    return this.likeCommentManagingFormatter.toLikeResponse(likeResponse);
  }

  @Delete('like')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  public async deleteLike(
    @Req() { user: userJwtInfo }: RequestWithAuth,
    @Body() body: LikeRequest,
  ): Promise<void> {
    const user = await this.userService.getByAuth0Id(userJwtInfo.auth0Id);
    return await this.likeCommentManagingService.deleteLike(body, user.id);
  }

  @Post('comment')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: CommentCreateResponse })
  public async createComment(
    @Req() { user: userJwtInfo }: RequestWithAuth,
    @Body() body: CommentGetCreateRequest,
  ): Promise<CommentCreateResponse> {
    const user = await this.userService.getByAuth0Id(userJwtInfo.auth0Id);
    const commentId = await this.likeCommentManagingService.createComment(
      body,
      user.id,
    );

    return this.likeCommentManagingFormatter.toCommentCreateResponce(commentId);
  }

  @Delete('comment')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  public async deleteComment(
    @Req() { user: userJwtInfo }: RequestWithAuth,
    @Body() body: CommentDeleteRequest,
  ) {
    const user = await this.userService.getByAuth0Id(userJwtInfo.auth0Id);

    return this.likeCommentManagingService.deleteComment(body, user.id);
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
    @Query('postId') postId: string,
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
