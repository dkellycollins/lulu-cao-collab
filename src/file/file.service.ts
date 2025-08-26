import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { File } from './entities/file.entity';
import { FileResponseDto } from './dto/file-response.dto';

@Injectable()
export class FileService {
  private s3: S3Client;
  private bucket = process.env.S3_BUCKET || 'profile-photo';

  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION || 'us-west-2',
      endpoint: process.env.S3_ENDPOINT || 'http://localhost:4566', // LocalStack endpoint
      forcePathStyle: true,              // Required for LocalStack
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',             // LocalStack dummy creds
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
      },
    });
  }

  async findOne(id: number): Promise<FileResponseDto> {
    const metadata = await this.fileRepository.findOneBy({ id });

    if (!metadata) {
      throw new NotFoundException(`File with id ${id} not found`);
    }

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: metadata.providerKey,
    });

    const response = await this.s3.send(command);
    const stream = response.Body as Readable;

    const data = await new Promise<string>((resolve, reject) => {
      let fileData = '';
      stream.on('data', (chunk) => (fileData += chunk));
      stream.on('end', () => resolve(fileData));
      stream.on('error', reject);
    });

    return {
      id: metadata.id,
      providerKey: metadata.providerKey,
      filename: metadata.filename,
      contentType: metadata.contentType,
      contentSize: metadata.contentSize,
      downloadUrl: data, 
    };
  }


  async create(file: Express.Multer.File): Promise<File> {
    const key = `${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer, // buffer provided by Multer
      ContentType: file.mimetype,
    });
    await this.s3.send(command);

    const metadata = this.fileRepository.create({
      providerKey: key,
      filename: file.originalname,
      contentType: file.mimetype,
      contentSize: file.size,
    });

    return this.fileRepository.save(metadata);
  }

  async update(id: number, file: Express.Multer.File): Promise<File> {
    const metadata = await this.fileRepository.findOneBy({ id });

    if (!metadata) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }

    const key = `${Date.now()}-${file.originalname}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    metadata.providerKey = key;
    metadata.filename = file.originalname;
    metadata.contentType = file.mimetype;
    metadata.contentSize = file.size;

    return this.fileRepository.save(metadata);
  }

  async delete(id: number): Promise<void> {
    const metadata = await this.fileRepository.findOneBy({ id });
    if (!metadata) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }

    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: metadata.providerKey,
      }),
    );

    await this.fileRepository.delete(id);
  }
}
