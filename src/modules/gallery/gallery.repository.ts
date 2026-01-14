import { Injectable, NotFoundException } from '@nestjs/common';
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

  async updateGalleryById(id: string, updateDto: UpdateGalleryDto) {
    const document = await this.repo.preload({
      id,
      ...updateDto,
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return await this.repo.save(document);
  }

  async findGalleryWithoutChecks(id: string): Promise<Gallery | null> {
    return await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });
  }
}
