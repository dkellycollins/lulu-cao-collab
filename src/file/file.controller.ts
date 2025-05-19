import { Controller, Get, Param, Post, Body, Delete, UploadedFile, UseInterceptors, ParseFilePipeBuilder, HttpStatus, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiFoundResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { File } from "./entities/file.entity";
import { FileService } from './file.service';

@ApiTags('files')
@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * Get a file by id
   */
  @Get('files/:id')
  @ApiFoundResponse({ description: 'File found', type: File })
  @ApiNotFoundResponse({ description: 'File not found' })
  findOne(@Param('id') id: number): Promise<File> {
    return this.fileService.findOne(id)
  }

  /**
   * Create a new file
   */
  @Post('files')
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ description: 'File created', type: File })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  uploadFileAndPassValidation(  
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
  ) {
    return this.fileService.create(file, 1)
  }

  /**
   * Create a new avatar
   */
  @Post('users/:id/avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ description: 'File created', type: File })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  uploadAvatarAndPassValidation(  
    @Param('id') id: number,
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
  ) {
    return this.fileService.create(file, id)
  }

  /**
   * Create a new blog cover image
   */
  @Post('blogs/:id/blog-cover')
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ description: 'File created', type: File })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  uploadBlogCoverAndPassValidation(  
    @Param('id') id: number,
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
  ) {
    return this.fileService.create(file, id)
  }

  /**
   * Upload a file
   */
  @Put('files/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({ description: 'File updated', type: File })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  updateFile(  
    @Param('id') id: number,
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
  ) {
    return this.fileService.update(id, file)
  }
  
  /**
   * Delete a file by id
   */
  @Delete('files/:id')
  @ApiOkResponse({ description: 'File Deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  delete(@Param('id') id: number): Promise<void> {
    return this.fileService.delete(id)
  }
}