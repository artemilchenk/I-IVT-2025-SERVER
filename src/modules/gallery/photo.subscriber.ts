import {
  EntitySubscriberInterface,
  EventSubscriber,
  RemoveEvent,
} from 'typeorm';
import { Photo } from './photo.entity';
import * as fs from 'node:fs';
import { join } from 'path';

@EventSubscriber()
export class GalleryPhotoSubscriber
  implements EntitySubscriberInterface<Photo>
{
  listenTo() {
    return Photo;
  }

  async beforeRemove(event: RemoveEvent<Photo>) {
    if (!event.entity) return;

    await fs.promises.unlink(
      join(process.cwd(), event.entity.path.replace('/uploads/', 'uploads/')),
    );
  }
}
