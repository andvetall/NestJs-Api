import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Books } from '../entities/books.entity';
import { BooksRepository } from '../repositories'


@Injectable()
export class BooksService {
  constructor(
    private booksRepository: BooksRepository
    ) { }
    

  async findAll(): Promise<Books[]> {
    return await this.booksRepository.findAllBooks()
  }


  async findOne(req): Promise<Books> {
    let book: any = await this.booksRepository.findOneBookById(req.params.id )
    return book
  }


  async updateBook(req): Promise<HttpException> {
    if (req.params.id) {
      await this.booksRepository.updateBook(req.params.id,  req.body)
      return new HttpException('Add is done', 200);
    } else return new HttpException("Request body  is incorrect!", 404) 
  }
  
 
  async deleteBook(req): Promise<HttpException> {
    if (req.params.id) {
      await this.booksRepository.deleteBook(req.params.id)
      return new HttpException('Add is done', 200);
    } else return new HttpException("Request body  is incorrect!", 404) 
  }


  async findBooksByTitle(req): Promise<any> {
    const Sequelize = require('sequelize');
    const books = await this.booksRepository.findAllToSearch(Sequelize.Op, req.params.title)
    return books
  }


  async postBook(req): Promise<HttpException> {
    if (req.body.title) {
      await this.booksRepository.createBook(req.body)
      return new HttpException('Add is done', 201);
    } else return new HttpException("Requset body  is incorrect!", 404) 
  }
}