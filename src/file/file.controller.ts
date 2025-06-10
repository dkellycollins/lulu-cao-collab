import { Controller, Get, Param, Post, Delete, UploadedFile, UseInterceptors, ParseFilePipeBuilder, HttpStatus, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiFoundResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { FileService } from './file.service';
import { FileResponseDto } from './dto/file-response.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('files')
@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * Get a file by id
   */
  @Get('files/:id')
  @ApiFoundResponse({ description: 'File found', type: FileResponseDto })
  @ApiNotFoundResponse({ description: 'File not found' })
  async findOne(@Param('id') id: number): Promise<FileResponseDto> {
    const file = this.fileService.findOne(id);
    return plainToInstance(FileResponseDto, file)
  }

  /**
   * Create a new file
   */
  @Post('files')
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ description: 'File created', type: FileResponseDto })
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
    const newFile = this.fileService.create(file, 1);
    return plainToInstance(FileResponseDto, newFile)
  }

  /**
   * Update a file
   */
  @Put('files/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({ description: 'File updated', type: FileResponseDto })
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
    const updatedFile = this.fileService.update(id, file);
    return plainToInstance(FileResponseDto, updatedFile)
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