import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Books } from '../entities/books.entity';
import { BooksRepository } from '../repositories'
import { ResponseModel } from 'src/models';


@Injectable()
export class BooksService {
  constructor(
    private booksRepository: BooksRepository
    ) { }
    

  async findAll(): Promise<Books[]> {
    return await this.booksRepository.findAllBooks()
  }


  async findOne(id): Promise<Books> {
    let book: any = await this.booksRepository.findOneBookById(id )
    return book
  }


  async updateBook(id, body): Promise<ResponseModel> {
    if (id) {
      await this.booksRepository.updateBook(id, body)
      return {
        success: true,
        message: 'Updating has been done'
      }
    } else {
      return {
        success: false,
        message: 'Request body  is incorrect!'
      }
    }
  }
  
 
  async deleteBook(id): Promise<ResponseModel> {
    if (id) {
      await this.booksRepository.deleteBook(id)
      return {
        success: true,
        message: 'Deleting has been done'
      }
    } else {
      return {
        success: false,
        message: 'Request body  is incorrect!'
      }
    }
  }


  async findBooksByTitle(title): Promise<Books[]> {
    const Sequelize = require('sequelize');
    const books:any = await this.booksRepository.findAllToSearch(Sequelize.Op, title)
    return books
  }


  async postBook(body): Promise<ResponseModel> {
    if (body.title) {
      await this.booksRepository.createBook(body)
      return {
        success: true,
        message: 'Posting has been done'
      }
    } else {
      return {
        success: false,
        message: 'Request body  is incorrect!'
      }
    }
  }
}