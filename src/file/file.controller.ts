import { Controller, Get, Param, Post, Body, Delete, UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiFoundResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { File } from "./entities/file.entity";
import { CreateFileDto } from "./dto/create-file.dto";
import { FileService } from './file.service';

@ApiTags('files')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * Get a file by id
   */
  // @Get(':id')
  // @ApiFoundResponse({ description: 'File found', type: File })
  // @ApiNotFoundResponse({ description: 'File not found' })
  // findOne(@Param('id') id: number): Promise<File> {
  //   return this.fileService.findOne(id)
  // }

  /**
   * Create a new file
   */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ description: 'File created', type: File })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  uploadFileAndPassValidation(  
    @Body() body: CreateFileDto,
    @UploadedFile(
      // new ParseFilePipe({
      //   validators: [
      //     new MaxFileSizeValidator({ maxSize: 1000 }),
      //     new FileTypeValidator({ fileType: 'image/jpeg' }),
      //   ]
      // })
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 1000000
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false
        }),
    )
   file: Express.Multer.File
  ) {
    return this.fileService.handleFileUpload(file)
  }
  
  /**
   * Delete a file by id
   */
  // @Delete(':id')
  // @ApiOkResponse({ description: 'File Deleted' })
  // @ApiForbiddenResponse({ description: 'Forbidden' })
  // delete(@Param('id') id: number): Promise<void> {
  //   return this.fileService.delete(id)
  // }
}