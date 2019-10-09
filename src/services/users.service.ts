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

  async findOne(id): Promise<ResponseModel> {
      const user: Users = await this.usersRepository.findOneUserById(id)
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

  async delete(id): Promise<ResponseModel> {
      const checkUser = await this.usersRepository.findOneUserById(id)
      if (checkUser) {
        await this.userRolesRepository.deleteRole(id)
        await this.usersRepository.deleteUser(id)
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

  async update(id, body): Promise<ResponseModel> {
    const checkUser = await this.usersRepository.findOneUserById(id)
      if (checkUser) {
        await this.usersRepository.updateUser(id, body )
        return {
          success: true,
          message: 'Update is done',
          data: body
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