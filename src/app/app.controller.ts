import { Controller, Get, Delete, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Root path
   * @returns 
   */
  @Get()
  @ApiOkResponse()
  hello(): string {
    return this.appService.hello();
  }

  @Get('health')
  @ApiOkResponse()
  health(): object {
    return {
      status: 'ok',
      server: process.env.SERVER_NAME
    }
  }

  // Call this endpoint to test nginx traffic distribution
  @Get('nginx')
  @ApiOkResponse()
  nginx(): object {
    return {
      server: process.env.SERVER_NAME,
      timestamp: new Date().toISOString(),
    }
  }

  // @Post()
  // login(): Promise<void> {
  //   return
  // }

  // @Delete()
  // logout(): Promise<void> {
  //   return
  // }
}