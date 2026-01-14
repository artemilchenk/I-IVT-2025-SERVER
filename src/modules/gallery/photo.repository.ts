import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findPhotoWithoutChecks(id: string): Promise<Photo | null> {
    return await this.repo.findOne({
      where: { id },
      relations: ['gallery.user'],
    });
  }

  async movePhotoById(id: string, galleryId: string) {
    const document = await this.repo.preload({
      id,
      galleryId,
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return await this.repo.save(document);
  }
}
