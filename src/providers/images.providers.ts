
import { Images } from '../entities/images.entity';

export const imagesProviders = [
  {
    provide: 'IMAGES_REPOSITORY',
    useValue: Images,
  },
];