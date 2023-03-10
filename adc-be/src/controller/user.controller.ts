import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponse } from '../dto/responce.dto';
import { UserRegisterRequest } from '../dto/request.dto';
import { UserModel } from '../model/user.model';
import { UserFormatter } from '../formatter/user.formatter';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithAuth } from '../types/interfaces';

@ApiTags('Users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('authorization')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userFormatter: UserFormatter,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: UserResponse })
  public async register(
    @Body() body: UserRegisterRequest,
    @Req() { user }: RequestWithAuth,
  ): Promise<UserResponse> {
    const { auth0Id } = user;
    const newUser = await this.userService.upsertUser(
      new UserModel(auth0Id, body.email, body.name),
    );

    return this.userFormatter.toUserResponse(newUser);
  }

  @Get('current')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  public async getCurrentUser(
    @Req() { user }: RequestWithAuth,
  ): Promise<UserResponse> {
    const { auth0Id } = user;
    const currentUser = await this.userService.getById(auth0Id);

    return this.userFormatter.toUserResponse(currentUser);
  }
}
