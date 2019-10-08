import { Injectable, Inject } from '@nestjs/common';
import { Users, Users_roles, Roles } from '../entities';
import { AuthRepository, UsersRepository, UserRolesRepository } from '../repositories'
import { ResponseModel } from '../models'



@Injectable()
export class UsersService {
  constructor(
   public usersRepository: UsersRepository,
   public userRolesRepository: UserRolesRepository
  ) { }

  async findAll(): Promise<ResponseModel> {
      const users: Users[] = await this.usersRepository.findAllUsers()
      if (users.length !== 0) {
        return {
          success: true,
          data: users
        }
      } else {
        return {
          success: false,
          message: 'Users not found',
          data: null
        }
      }
  }

  async findOne(req): Promise<ResponseModel> {
      const user: Users = await this.usersRepository.findOneUserById(req.params.id)
      if (user) {
        return {
          success: true,
          data: user
        };
      } else {
        return {
          success: false,
          message: 'User not found',
          data: null
        }
      }
  }

  async delete(req): Promise<ResponseModel> {
      const checkUser = await this.usersRepository.findOneUserById(req.params.id)
      if (checkUser) {
        await this.userRolesRepository.deleteRole(req.params.id)
        await this.usersRepository.deleteUser(req.params.id)
        return {
          success: true,
          message: 'Delete is done'
        }
      } else {
        return {
          success: false,
          message: 'User not found',
          data: null
        }
      }
  }

  async update(req): Promise<ResponseModel> {
    const checkUser = await this.usersRepository.findOneUserById(req.params.id)
      if (checkUser) {
        await this.usersRepository.updateUser( req.params.id, req.body )
        return {
          success: true,
          message: 'Update is done',
          data: req.body
        }
      } else {
        return {
          success: false,
          message: 'User not found',
          data: null
        }
      }
  }

 
}