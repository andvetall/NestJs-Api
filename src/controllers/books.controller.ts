import { Controller, Get, Post, Req, Put, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from '../services';
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get()
    findAll(): any {
        return this.booksService.findAll();
    }

    @Get('/id/:id')
    findOne(@Req() req: Request): any {
        return this.booksService.findOne(req);
    }

    @Get('/:title')
    findBooksByTitle(@Req() req: Request): any {
        return this.booksService.findBooksByTitle(req);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    updatBook(@Req() req: Request): any {
        return this.booksService.updateBook(req);
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    deleteBook(@Req() req: Request): any {
        return this.booksService.deleteBook(req);
    }
    @UseGuards(AuthGuard('jwt'))
    @Post()
    postBook(@Req() req: Request): any {
        return this.booksService.postBook(req);
    }
}
