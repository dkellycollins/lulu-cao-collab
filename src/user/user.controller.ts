import { Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service'

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user' })
  @Get(':id')
  getUser(@Param('id') id: string): string {
    return this.userService.getUser(id)
  }

  @ApiOperation({ summary: 'Create a new user' })
  @Post()
  create(): Promise<void> {
    return
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'The ID of the user' })
  @Put(':id')
  update(): Promise<void> {
    return
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'The ID of the user' })
  @Delete(':id')
  delete(): Promise<void> {
    return
  }
}
