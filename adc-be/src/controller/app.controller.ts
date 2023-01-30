import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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
  getPrivate(): string {
    return 'temp private';
  }
}
