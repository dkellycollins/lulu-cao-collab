import { Controller, Get, Param, Post, Put, Delete, Body, Query, UploadedFile, ParseFilePipeBuilder, HttpStatus, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiFoundResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

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
  async findOne(@Param('id') id: number): Promise<UserResponseDto> {
    const user = this.userService.findOneById(+id)
    return plainToInstance(UserResponseDto, user)
  }

  /**
   * Query a user by username
   */
  @Get()
  @ApiQuery({ name: 'username' })
  @ApiFoundResponse({ description: 'User found'})
  @ApiNotFoundResponse({ description: 'User not found' })
  async findOneByUsername(@Query('username') username: string): Promise<UserResponseDto> {
    const user = this.userService.findOneByUsername(username)
    return plainToInstance(UserResponseDto, user)
  }

  /**
   * Create a new user
   */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ description: 'User created', type: UserResponseDto })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 1000000
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File
  ): Promise<UserResponseDto> {
    const user = this.userService.create(createUserDto, file);
    return plainToInstance(UserResponseDto, user)
  }

  /**
   * Update a user by id
   */
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({ description: 'User updated', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 1000000
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File
  ): Promise<UserResponseDto> {
    const user = this.userService.update(id, updateUserDto, file)
    return plainToInstance(UserResponseDto, user)
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
