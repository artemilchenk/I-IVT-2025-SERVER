import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { GalleryRepository } from './gallery.repository';
import { Gallery } from './gallery.entity';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { UploadPhotoDto } from './dto/upload-image.dto';
import { Photo } from './photo.entity';
import { PhotoRepository } from './photo.repository';
import { MediaService } from '../media/media.service';
import { GalleryOrder, PhotoDto } from '../../types/gallery';

@Injectable()
export class GalleryService {
  limit = 4;
  order: GalleryOrder = {
    createdAt: 'ASC',
  };

  constructor(
    private readonly galleryRepository: GalleryRepository,
    private readonly photoRepository: PhotoRepository,
    private readonly mediaService: MediaService,
  ) {}

  async create(userId: number, createGalleryDto: CreateGalleryDto) {
    const galleryWithUser = {
      ...createGalleryDto,
      user: { id: userId },
    };

    return await this.galleryRepository.createOne(galleryWithUser);
  }

  async getItems(userId: number, page: number) {
    const skip = (page - 1) * this.limit;

    const [items, total] = await this.galleryRepository.getItems(
      userId,
      skip,
      this.limit,
      this.order,
    );

    return {
      data: items,
      meta: {
        page,
        total,
      },
    };
  }

  async findOneWithoutChecks(id: string): Promise<Gallery | null> {
    return await this.galleryRepository.findOneWithoutChecks(id);
  }

  async checkActionForUser(
    id: string,
    userId: number,
  ): Promise<Gallery | null> {
    const gallery = await this.findOneWithoutChecks(id);
    if (!gallery) throw new NotFoundException('Gallery not found');

    if (gallery.user.id + '' !== userId + '')
      throw new ForbiddenException('You do not have access to this gallery');

    return gallery;
  }

  async findOne(id: string, userId: number): Promise<Gallery | null> {
    return await this.checkActionForUser(id, userId);
  }

  async updateById(
    id: string,
    userId: number,
    updateGalleryDto: UpdateGalleryDto,
  ) {
    await this.checkActionForUser(id, userId);

    return await this.galleryRepository.updateById(id, updateGalleryDto);
  }

  async deleteById(id: string, userId: number) {
    await this.checkActionForUser(id, userId);

    const result = await this.galleryRepository.deleteOne({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Gallery with id ${id} not found`);
    }

    return { id };
  }
  async addPhoto(
    galleryId: string,
    uploadImageDto: UploadPhotoDto,
  ): Promise<Photo> {
    const path = await this.mediaService.uploadFile(uploadImageDto.buffer);

    const photo: PhotoDto = {
      galleryId,
      path,
      originalFilename: path,
    };

    return await this.photoRepository.createOne(photo);
  }

  async getAllPhotos(galleryId: string): Promise<Photo[]> {
    return await this.photoRepository.findAllPhotos(galleryId);
  }
}
