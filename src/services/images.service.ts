import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Images } from '../entities'


@Injectable()
export class ImagesService {
  constructor(
    @Inject('IMAGES_REPOSITORY') private readonly IMAGES_REPOSITORY: typeof Images) { }
    
  async findAllImg(): Promise<Images[]> {
    return await this.IMAGES_REPOSITORY.findAll<Images>();
  }
  
}