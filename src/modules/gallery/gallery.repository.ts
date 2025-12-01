import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../../services/repository';
import { Gallery } from './gallery.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class GalleryRepository extends RepositoryService<Gallery> {
  constructor(dataSource: DataSource) {
    super(dataSource, Gallery);
  }
}
