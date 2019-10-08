import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Users, Roles } from '../entities';

@Injectable()
export class UsersRepository {
    @Inject('USERS_REPOSITORY') private readonly USERS_REPOSITORY: typeof Users

    async findAllUsers(){
        return await this.USERS_REPOSITORY.findAll<Users>({
            include: [Roles]
          });
    }
    async findOneUserByEmail(email: string) {
        const user = await this.USERS_REPOSITORY.findOne<Users>({ where: { email: email } })
        return user
    }
    async findOneUserById(id: number) {
        const user = await this.USERS_REPOSITORY.findOne<Users>({ where: { _id: id } })
        return user
    }

    async createUser(newUser){
        await this.USERS_REPOSITORY.create<Users>(newUser);
    }
    async deleteUser(id?){
        this.USERS_REPOSITORY.destroy({ where: { _id: id } });
    }
    async updateUser(id?, body?){
        this.USERS_REPOSITORY.update<Users>(body, { where: { _id: id } });
    }
}