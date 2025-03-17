import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
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
  @ApiParam({ name: 'id', description: 'File Id' })
  @ApiOkResponse({ description: 'File found', type: File })
  @ApiNotFoundResponse({ description: 'File not found' })
  getFile(@Param('id') id: string): any {}

  /**
   * Create a file
   */
  @Post()
  @ApiCreatedResponse({ description: 'File created', type: File })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(@Body() createFileDto: CreateFileDto): Promise<void> {
    return 
  }
}