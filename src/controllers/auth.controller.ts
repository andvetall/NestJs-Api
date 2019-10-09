import { Controller, Get, Response, Request, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services';
import { AuthGuard } from '@nestjs/passport';
import { TokenModel } from '../models/token.models'

  


@Controller('login')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @UseGuards(AuthGuard('local'))
    @Post()
    async login(@Request() req): Promise<TokenModel>{
        return this.authService.login(req.user);
    }

    @Post("/register")
    registerNewUser(@Req() req: Request): any {
        return this.authService.registerNewUser(req.body);
    }

}
