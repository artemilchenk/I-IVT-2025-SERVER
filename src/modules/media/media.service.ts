import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaService {
  constructor() {}

  async uploadFile(buffer: string): Promise<string> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(buffer);
      }, 2000);
    });
  }
}
