import { Injectable } from '@nestjs/common';
import { writeFile, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import { randomUUID } from 'crypto';
import { Buffer } from 'buffer';

@Injectable()
export class MediaService {
  staticPath = '/uploads';

  constructor() {}

  async saveFile(originalName: string, buffer: Buffer) {
    // Ensure upload directory exists
    const uploadDir = join(process.cwd(), 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Extract extension from original file name
    const originalExt = extname(originalName) || '.bin';
    const filename = `${randomUUID()}${originalExt}`;

    // Full path where file will be written
    const filePath = join(this.staticPath, filename);

    // Write file to disk
    await writeFile(join(uploadDir, filename), buffer);

    return filePath;
  }
}
