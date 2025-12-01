import { Injectable } from '@nestjs/common';

@Injectable()
export class GalleryService {
  create(createGalleryDto: any) {
    return { message: 'Gallery created', data: createGalleryDto };
  }

  findAll() {
    return [{ id: 1, title: 'Gallery 1' }];
  }

  findOne(id: string) {
    return { id, title: 'Some Gallery' };
  }

  update(id: string, updateGalleryDto: any) {
    return { message: 'Gallery updated', id, data: updateGalleryDto };
  }

  remove(id: string) {
    return { message: 'Gallery removed', id };
  }
}
