import { Controller, Get, Post, Req, Res, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService, AuthService } from '../services';
import { Request, Response } from 'express'
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) { }

    @Get()
    findAll(){
        return this.usersService.findAll();
    }

    @Get('/:id')
    findOne(@Req() req: Request): any {
        return this.usersService.findOne(req.params.id);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    delete(@Req() req: Request): any {
        return this.usersService.delete(req.params.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    update(@Req() req: Request): any {
        return this.usersService.update(req.params.id, req.body);
    }

  
}
