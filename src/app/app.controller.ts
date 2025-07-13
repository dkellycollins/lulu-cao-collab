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
  @ApiOkResponse({ description: "VibeReads - A list of featured blogs coming soon..." })
  hello(): string {
    return this.appService.hello();
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
