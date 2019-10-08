import { Books } from '../entities/books.entity';

export const booksProviders = [
  {
    provide: 'BOOKS_REPOSITORY',
    useValue: Books,
  },
];
