import { Controller, Get, Post, Req, Put, Delete, UseGuards } from '@nestjs/common';
import { ImagesService } from '../services';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) { }

    @Get()
    findAllImg(): any {
        return this.imagesService.findAllImg();
    }

}
