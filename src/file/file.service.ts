import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const metadata = this.fileRepository.findOneBy({ id });
    return metadata
  }

  async create(
    file: Express.Multer.File,
    userId?: string,
    blogId?: string
  ): Promise<File> {
    if (!userId && !blogId) {
      throw new BadRequestException ("user or blog required")
    }
    const metadata = this.fileRepository.create({ 
      providerKey: file.path, 
      filename: file.originalname, 
      contentType: file.mimetype, 
      contentSize: file.size,
    });
    return this.fileRepository.save(metadata);
  }

  async update(
    id: number, 
    file: Express.Multer.File,
  ): Promise<File> {
    const metadata = await this.fileRepository.findOneBy({ id });
    if (!file) throw new NotFoundException(`File with ID ${id} not found`);

    metadata.providerKey = file.path;
    metadata.filename = file.originalname;
    metadata.contentType = file.mimetype;
    metadata.contentSize = file.size;

    return this.fileRepository.save(metadata);
  }

  async delete(id: number): Promise<void> {
    const result = await this.fileRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`File with ID ${id} not found`);
  }
}
