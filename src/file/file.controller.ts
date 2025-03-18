import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
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
  @Get(':id')
  @ApiFoundResponse({ description: 'File found', type: File })
  @ApiNotFoundResponse({ description: 'File not found' })
  findOne(@Param('id') id: number): Promise<File> {
    return this.fileService.findOne(id)
  }

  /**
   * Create a new file
   */
  @Post()
  @ApiCreatedResponse({ description: 'File created', type: File })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(@Body() createFileDto: CreateFileDto): Promise<File> {
    return this.fileService.create(
      createFileDto.providerKey, 
      createFileDto.filename,
      createFileDto.contentType,
      createFileDto.contentSize,
    )
  }
  
  /**
   * Delete a file by id
   */
  @Delete(':id')
  @ApiOkResponse({ description: 'File Deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  delete(@Param('id') id: number): Promise<void> {
    return this.fileService.delete(id)
  }
}