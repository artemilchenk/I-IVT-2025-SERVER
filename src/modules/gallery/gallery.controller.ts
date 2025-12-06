import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtUser } from '../../types/auth';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import {
  galleryAllResponseSchema,
  galleryBodySchema,
  galleryResponseSchema,
} from '../../constants';
import { ApiBadRequestAndUnauthorized } from '../../decorators';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleriesService: GalleryService) {}
  // CREATE
  @Post()
  @UseGuards(JwtAuthGuard)
  @Post('sign-up')
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

  // READ ALL
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get galleries by user id' })
  @ApiResponse({
    status: 200,
    description: 'Returns galleries related to its creator',
    schema: { example: galleryAllResponseSchema },
  })
  @ApiBadRequestAndUnauthorized()
  findAll(@Request() req: Request & { user: JwtUser }) {
    return this.galleriesService.findAllByUserId(req.user.id);
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
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.galleriesService.findOne(+id);
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
    @Param('id', ParseIntPipe) id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    return this.galleriesService.updateById(+id, updateGalleryDto);
  }

  // DELETE
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update gallery by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns deleted successfully message',
    schema: { example: { message: 'Deleted successfully' } },
  })
  @ApiBadRequestAndUnauthorized()
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.galleriesService.deleteById(+id);
  }
}
