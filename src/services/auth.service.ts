import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt"
import { Users, Roles, Users_roles } from '../entities';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from "@nestjs/common"
import * as jwtr from "jwt-then"
import { TokenModel, ResponseModel } from '../models'
import { AuthRepository, UsersRepository, UserRolesRepository } from '../repositories'
import { jwtConstants } from '../secrets/jwt-secret-key';



@Injectable()
export class AuthService {
  public jwtService: JwtService;
  constructor(
    public authRepository: AuthRepository,
    public usersRepository: UsersRepository,
    public userRolesRepository: UserRolesRepository
  ){ }
  
  async validateUser(email: string, password: string): Promise<any> {
    const user: any = await this.usersRepository.findOneUserByEmail(email)
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const matchPasswords = await bcrypt.compare(password, user.dataValues.password);
    if (user && matchPasswords) {
      return user.dataValues;
    } else throw new HttpException('Email or password incorrect', 401);;
  }

  async login(user: Users): Promise<TokenModel> {
    let permissions: String = await this.authRepository.addRole(user._id);
    const payload = {
      _id: user._id,
      email: user.email,
      login: user.login,
      country: user.country,
      city: user.city,
      street: user.street,
      house: user.house,
      appartment: user.appartment,  
      mobile: user.mobile,
      website: user.website,
      userImg: user.userImg,
      permission: permissions
    };
    const access_token = await jwtr.sign(payload, jwtConstants.secret,)
    return {
      token: access_token
    };
  }

  async registerNewUser(req): Promise<ResponseModel> {
    const newUser: any = {
      _id: null,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      login: req.body.login,
      userImg: req.body.userImg,
      website: req.body.website,
      mobile: req.body.mobile,
      country: req.body.country,
      city: req.body.city,
      street: req.body.street,
      house: req.body.house,
      appartment: req.body.appartment
    }
      const matchUser: Users = await this.usersRepository.findOneUserByEmail(newUser.email)
      if (!matchUser) {
        await this.usersRepository.createUser(newUser)
        const user: Users = await this.usersRepository.findOneUserByEmail(newUser.email)
        const newId = user._id
        const newRole = {
          users_id: newId,
          roles_id: 3
        }
        await this.userRolesRepository.createRole(newRole)
        return {
          success: true,
          message: "User Successfully created"
        }
      } else return {
        success: false,
        message: `User with this E-mail alredy exists!`
      }
  }

}