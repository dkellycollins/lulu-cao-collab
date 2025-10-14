import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { File } from './entities/file.entity';
import { Blog } from '../blog/entities/blog.entity';
import { User } from '../user/entities/user.entity';
import { FileResponseDto } from './dto/file-response.dto';

@Injectable()
export class FileService {
  private s3: S3Client;
  private bucket = process.env.S3_BUCKET || 'blog-files';

  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: metadata.providerKey,
      });

      // Generate a presigned URL valid for 1 hour (3600 seconds)
      const signedUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

      return {
        id: metadata.id,
        providerKey: metadata.providerKey,
        filename: metadata.filename,
        contentType: metadata.contentType,
        contentSize: metadata.contentSize,
        downloadUrl: signedUrl,
      };
    } catch (err: any) {
      if (err.name === 'NoSuchKey' || err.$metadata?.httpStatusCode === 404) {
        throw new NotFoundException(
          `File with id ${id} (key=${metadata.providerKey}) not found in S3`,
        );
      }
      throw new InternalServerErrorException(
        `Error retrieving file with id ${id}: ${err.message}`,
      );
    }
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

    const isBlogCover = await this.blogRepository.exists({ where: {coverImage: {id}} });
    const isProfileAvatar = await this.userRepository.exists({ where: {profilePicture: {id}} });
    if (isBlogCover || isProfileAvatar) {
      throw new BadRequestException('File is in use');
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
