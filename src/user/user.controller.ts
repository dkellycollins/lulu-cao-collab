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
   * Get a user by id
   */
  @Get(':id')
  @ApiFoundResponse({ description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOneById(+id)
  }

  /**
   * Query a user by username
   */
  @Get()
  @ApiQuery({ name: 'username' })
  @ApiFoundResponse({ description: 'User found'})
  @ApiNotFoundResponse({ description: 'User not found' })
  findOneByUsername(@Query('username') username: string): Promise<User> {
    return this.userService.findOneByUsername(username)
  }

  /**
   * Create a new user
   */
  @Post()
  @ApiCreatedResponse({ description: 'User created', type: User })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  /**
   * Update a user by id
   */
  @Put(':id')
  @ApiOkResponse({ description: 'User updated', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.userService.update(id, updateUserDto)
  }

  /**
   * Delete a user by id
   */
  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id)
  }
}
