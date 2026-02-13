import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Gallery } from './gallery.entity';

@Entity('photo')
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @Column()
  originalFilename: string;

  @Column()
  galleryId: string;

  @ManyToOne(() => Gallery, (gallery) => gallery.images)
  @JoinColumn({ name: 'galleryId' })
  gallery: Gallery;

  @CreateDateColumn()
  createdAt: Date;
}
