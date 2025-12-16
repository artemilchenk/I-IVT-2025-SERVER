import { Injectable } from '@nestjs/common';
import { RepositoryService } from '../../services/repository';
import * as typeorm from 'typeorm';

@Injectable()
export class MediaRepository<
  T extends typeorm.ObjectLiteral,
> extends RepositoryService<T> {
  constructor(dataSource: typeorm.DataSource, entity: typeorm.ObjectType<T>) {
    super(dataSource, entity);
  }
}
