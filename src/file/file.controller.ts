import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiFoundResponse, ApiNotFoundResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { File } from "./entities/file.entity";
import { CreateFileDto } from "./dto/create-file.dto";

@ApiTags('files')
@Controller('files')
export class FileController {
  @Get(':id')
  @ApiParam({ name: 'id', description: 'File Id' })
  @ApiFoundResponse({ description: 'File found', type: File })
  @ApiNotFoundResponse({ description: 'File not found' })
  getFile(@Param('id') id: string): any {}

  @Post()
  @ApiCreatedResponse({ description: 'File created', type: File })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(@Body() createFileDto: CreateFileDto): Promise<void> {
    return 
  }
}