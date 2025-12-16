import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { GalleryRepository } from './gallery.repository';
import { MediaModule } from '../media/media.module';
import { PhotoRepository } from './photo.repository';

@Module({
  imports: [MediaModule],
  controllers: [GalleryController],
  providers: [GalleryService, GalleryRepository, PhotoRepository],
})
export class GalleryModule {}
