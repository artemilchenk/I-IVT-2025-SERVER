import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleriesService: GalleryService) {}
  // CREATE
  @Post()
  create(@Body() createGalleryDto: any) {
    return this.galleriesService.create(createGalleryDto);
  }

  // READ ALL
  @Get()
  findAll() {
    return this.galleriesService.findAll();
  }

  // READ ONE
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleriesService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGalleryDto: any) {
    return this.galleriesService.update(id, updateGalleryDto);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleriesService.remove(id);
  }
}
