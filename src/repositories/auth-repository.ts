 import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Users, Roles } from '../entities';

@Injectable()
export class AuthRepository {
    @Inject('AUTH_REPOSITORY') public AUTH_REPOSITORY: typeof Users

    

    async comparePassword(password: string, userPassword: string) {
        const matchPasswords = await bcrypt.compare(password, userPassword);
        return matchPasswords
    }

    async addRole(userId){
        const permissions  = await this.AUTH_REPOSITORY.findOne<Users>({
               where: { _id: userId },
               include: [Roles]
            })
            return permissions.dataValues.roleId[0].dataValues.roleName
    }
}