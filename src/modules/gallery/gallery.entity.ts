import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Photo } from './photo.entity';

@Entity('gallery')
export class Gallery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.galleries, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Photo, (photo) => photo.gallery)
  images?: Photo[];

  @CreateDateColumn()
  createdAt: Date;
}
