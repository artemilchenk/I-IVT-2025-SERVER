import { Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryService } from '../../services/repository';
import { Gallery } from './gallery.entity';
import { DataSource } from 'typeorm';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Injectable()
export class GalleryRepository extends RepositoryService<Gallery> {
  constructor(dataSource: DataSource) {
    super(dataSource, Gallery);
  }

  async findAllByUserId(userId: number) {
    return await this.repo.find({
      where: {
        user: { id: userId },
      },
      relations: {
        images: true,
      },
    });
  }

  async updateById(userId: string, updateGalleryDto: UpdateGalleryDto) {
    const gallery = await this.repo.preload({
      id: userId,
      ...updateGalleryDto,
    });

    if (!gallery) {
      throw new NotFoundException('Gallery not found');
    }

    return await this.repo.save(gallery);
  }

  async findOneWithoutChecks(id: string): Promise<Gallery | null> {
    return await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });
  }
}
