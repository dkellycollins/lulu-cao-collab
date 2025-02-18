import { Controller, Get, Param, Post, Put, Delete, Body, Query } from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiFoundResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get a user by Id
   */
  @Get(':id')
  @ApiParam({ name: 'id', description: 'The ID of the user', type: User })
  @ApiFoundResponse({ description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  getUser(@Param('id') id: string): string {
    return this.userService.getUser(id)
  }

  /**
   * Query a user by username
   */
  @Get()
  @ApiQuery({ name: 'username' })
  @ApiFoundResponse({ description: 'User found', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  getUserByUsername(@Query('username') username: string) {}

  /**
   * Create a new user
   */
  @Post()
  @ApiCreatedResponse({ description: 'User created', type: User })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return
  }

  /**
   * Update a user by Id
   */
  @Put(':id')
  @ApiParam({ name: 'id', description: 'The ID of the user', type: User })
  update(@Body() updateUserDto: UpdateUserDto): Promise<void> {
    return
  }

  /**
   * Delete a user by Id
   */
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'The ID of the user' })
  @ApiOkResponse({ description: 'User deleted' })
  delete(): Promise<void> {
    return
  }
}
