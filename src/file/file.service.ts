import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) // Inject the fileRepository
    private fileRepository: Repository<File>,
  ) {}

  findOne(id: number): Promise<File> {
    return this.fileRepository.findOneBy({ id });
  }

  async create(
    providerKey: string, 
    filename: string,
    contentType: string,
    contentSize: string,
  ): Promise<File> {
    const file = this.fileRepository.create({ providerKey, filename, contentType, contentSize });
    return this.fileRepository.save(file);
  }

  async update(
    id: number, 
    providerKey?: string, 
    filename?: string,
    contentType?: string,
    contentSize?: string,
  ): Promise<File> {
    const file = await this.fileRepository.findOneBy({ id });
    if (!file) throw new NotFoundException(`File with ID ${id} not found`);

    if (providerKey) file.providerKey = providerKey;
    if (filename) file.filename = filename;
    if (contentType) file.contentType = contentType;
    if (contentSize) file.contentSize = contentSize;

    return this.fileRepository.save(file);
  }

  async delete(id: number): Promise<void> {
    const result = await this.fileRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`File with ID ${id} not found`);
  }
}
