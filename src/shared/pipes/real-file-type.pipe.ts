import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { fileTypeFromBuffer } from 'file-type';

@Injectable()
export class RealFileTypePipe implements PipeTransform {
  constructor(private allowedTypes: string[]) {}

  async transform(file: Express.Multer.File) {
    if (!file || !file.buffer) {
      throw new BadRequestException('File not found');
    }

    const type = await fileTypeFromBuffer(file.buffer);

    if (!type || !this.allowedTypes.includes(type.mime)) {
      throw new BadRequestException('Invalid file content');
    }

    return file;
  }
}
