export class CreateFileDto {
  /**
   * File storage provider key
   */
  providerKey: string;

  filename: string;

  contentType: string;

  contentSize: string;
}