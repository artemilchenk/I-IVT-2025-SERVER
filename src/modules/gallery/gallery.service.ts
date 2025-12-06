import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { GalleryRepository } from './gallery.repository';

@Injectable()
export class GalleryService {
  constructor(private readonly galleryRepository: GalleryRepository) {}

  async create(userId: number, createGalleryDto: CreateGalleryDto) {
    const galleryWithUser = {
      ...createGalleryDto,
      user: { id: userId },
    };

    return await this.galleryRepository.createOne(galleryWithUser);
  }

  async findAllByUserId(userId: number) {
    return await this.galleryRepository.findAllByUserId(userId);
  }

  async findOne(id: number) {
    const gallery = await this.galleryRepository.findByKey('id', id);
    if (!gallery)
      throw new NotFoundException(`Gallery with ID ${id} not found`);

    return gallery;
  }

  async updateById(id: number, updateGalleryDto: any) {
    return await this.galleryRepository.updateById(id, updateGalleryDto);
  }

  async deleteById(id: number) {
    const result = await this.galleryRepository.deleteOne({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Gallery with id ${id} not found`);
    }

    return { message: 'Deleted successfully' };
  }
}
