import { ApiProperty } from "@nestjs/swagger";

export class CreateFileDto {
  id: number;

  /**
   * File storage provider key
   */
  providerKey: string;

  filename: string;

  contentType: string;

  contentSize: string;

  user?: string;

  blog?: string;
}