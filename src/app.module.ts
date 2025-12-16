import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { User } from './modules/user/user.entity';
import { Gallery } from './modules/gallery/gallery.entity';
import { MediaModule } from './modules/media/media.module';
import { Photo } from './modules/gallery/photo.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'iivt2025',
      autoLoadEntities: true,
      synchronize: false,
      entities: [User, Gallery, Photo],
      migrations: ['migrations/*.ts'],
    }),
    AuthModule,
    GalleryModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
