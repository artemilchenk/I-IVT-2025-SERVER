import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MediaRepository } from '../media/media.repository';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoRepository extends MediaRepository<Photo> {
  constructor(dataSource: DataSource) {
    super(dataSource, Photo);
  }

  async findAllPhotos(galleryId: string) {
    return await this.repo.find({ where: { galleryId } });
  }
}
