import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../../services/repository';
import { Gallery } from './gallery.entity';
import { DataSource } from 'typeorm';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { GalleryOrder } from '../../types/gallery';

@Injectable()
export class GalleryRepository extends RepositoryService<Gallery> {
  constructor(dataSource: DataSource) {
    super(dataSource, Gallery);
  }

  async getItems(
    userId: number,
    skip: number,
    limit: number,
    order?: GalleryOrder,
  ): Promise<[Gallery[], number]> {
    return await this.repo.findAndCount({
      where: {
        user: { id: userId },
      },
      relations: {
        images: true,
      },
      take: limit,
      skip,
      order,
    });
  }

  async updateGallery(gallery: Gallery) {
    return await this.repo.save(gallery);
  }

  async preloadGallery(
    id: string,
    updateDto: UpdateGalleryDto,
  ): Promise<Gallery | undefined> {
    return await this.repo.preload({
      id,
      ...updateDto,
    });
  }

  async findGalleryWithoutChecks(
    id: string,
    options?: { relations?: string[] },
  ): Promise<Gallery | null> {
    return await this.repo.findOne({
      where: { id },
      relations: options?.relations,
    });
  }
}
