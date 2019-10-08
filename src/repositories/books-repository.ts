import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Books} from '../entities';

@Injectable()
export class BooksRepository {
    @Inject('BOOKS_REPOSITORY') private readonly BOOKS_REPOSITORY: typeof Books

    async findAllBooks(){
        return await this.BOOKS_REPOSITORY.findAll<Books>();
    }
    async findAllToSearch(Op, title){
        await this.BOOKS_REPOSITORY.findAll<Books>({
            where:
            {
              title: {
                [Op.substring]: `${title}`
              }
            }
          });
    }
    async findOneBookById(id){
        return await this.BOOKS_REPOSITORY.findOne<Books>({ where: { _id: id } });
    }
    async createBook(body){
        this.BOOKS_REPOSITORY.create<Books>(body)
    }
    async updateBook(id, book){
        return this.BOOKS_REPOSITORY.update<Books>(book, { where: { _id: id } })
    }
    async deleteBook(id){
        this.BOOKS_REPOSITORY.destroy({ where: { _id: id } })
    }
}