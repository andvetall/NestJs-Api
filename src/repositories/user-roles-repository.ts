import { Injectable, Inject } from '@nestjs/common';
import { Users, Roles, Users_roles } from '../entities';

@Injectable()
export class UserRolesRepository {
    @Inject('USER_ROLES_REPO') private readonly USER_ROLES_REPO: typeof Users_roles

    async createRole(newRole){
       return await this.USER_ROLES_REPO.create<Users_roles>(newRole);
    }
    async deleteRole(id){
        this.USER_ROLES_REPO.destroy({ where: { users_id: id } });
    }
  
}