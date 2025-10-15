import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from '../service/app.service';
import { RequestWithAuth } from '../types/interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('authorization')
  @Get('/private')
  getPrivate(@Req() req: RequestWithAuth): string {
    console.log(req.user.auth0Id);
    return 'temp private';
  }
}
