import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtUser } from '../../types/auth';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import {
  galleriesResponseSchema,
  galleryBodySchema,
  galleryResponseSchema,
  user,
} from '../../constants';
import { ApiBadRequestAndUnauthorized } from '../../decorators';
import { UploadPhotoDto } from './dto/upload-image.dto';
import { GalleriesPaginationDto } from './dto/get-galleries.dto';
import { GalleriesResponse } from '../../types/gallery';
import { MovePhotoDto } from './dto/move-image.dto';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleriesService: GalleryService) {}
  // CREATE
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create a new gallery',
  })
  @ApiBody({ description: 'Gallery payload', schema: galleryBodySchema })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    schema: { example: galleryResponseSchema },
  })
  @ApiBadRequestAndUnauthorized()
  async create(
    @Request() req: Request & { user: JwtUser },
    @Body() createGalleryDto: CreateGalleryDto,
  ) {
    return this.galleriesService.create(req.user.id, createGalleryDto);
  }

  // READ BY PAGE
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get galleries by user id' })
  @ApiResponse({
    status: 200,
    description: 'Returns galleries related to its creator',
    schema: { example: galleriesResponseSchema },
  })
  @ApiBadRequestAndUnauthorized()
  getItems(
    @Request() req: Request & { user: JwtUser },
    @Query() query: GalleriesPaginationDto,
  ): Promise<GalleriesResponse> {
    return this.galleriesService.getItems(req.user.id, query.page);
  }

  // READ ONE
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get gallery by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns gallery by id',
    schema: { example: galleryResponseSchema },
  })
  @ApiBadRequestAndUnauthorized()
  findOne(
    @Request() req: Request & { user: JwtUser },
    @Param('id') id: string,
  ) {
    return this.galleriesService.findOne(id, req.user.id);
  }

  // UPDATE
  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update gallery by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns updated gallery by id',
    schema: { example: galleryResponseSchema },
  })
  @ApiBadRequestAndUnauthorized()
  update(
    @Request() req: Request & { user: JwtUser },
    @Param('id') id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    return this.galleriesService.updateGalleryById(
      id,
      req.user.id,
      updateGalleryDto,
    );
  }

  // DELETE
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update gallery by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns deleted successfully message',
    schema: { example: { id: 'stringid' } },
  })
  @ApiBadRequestAndUnauthorized()
  remove(@Request() req: Request & { user: JwtUser }, @Param('id') id: string) {
    return this.galleriesService.deleteById(id, req.user.id);
  }

  // CREATE PHOTO
  @Post('photo/:galleryId')
  @UseGuards(JwtAuthGuard)
  addPhoto(
    @Param('galleryId') galleryId: string,
    @Body() uploadImageDto: UploadPhotoDto,
  ) {
    return this.galleriesService.addPhoto(galleryId, uploadImageDto);
  }

  // MOVE PHOTO
  @Post('photo/move')
  @UseGuards(JwtAuthGuard)
  movePhoto(
    @Request() req: Request & { user: JwtUser },
    @Body() movePhotoDto: MovePhotoDto,
  ) {
    return this.galleriesService.movePhoto({
      userId: user.id,
      id: movePhotoDto.id,
      targetContainerId: movePhotoDto.targetContainerId,
    });
  }

  // GET PHOTOS
  @Get(':galleryId/photos')
  @UseGuards(JwtAuthGuard)
  findAllPhotos(@Param('galleryId') galleryId: string) {
    return this.galleriesService.getAllPhotos(galleryId);
  }
}
