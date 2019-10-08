import { Module } from '@nestjs/common';
import { DatabaseModule } from './db.connection/db-module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { BooksController, UsersController, AuthController, ImagesController } from './controllers';
import { BooksService, UsersService, AuthService, ImagesService } from './services';
import { booksProviders, imagesProviders, authProviders, usersProviders, rolesProviders , usersrolesProviders} from './providers';
import { LocalStrategy, JwtStrategy } from './common';
import { AuthRepository, UsersRepository, UserRolesRepository, BooksRepository } from './repositories'
import { jwtConstants } from './secrets/jwt-secret-key'

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),],
  controllers: [BooksController, UsersController, AuthController, ImagesController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    BooksService,
    ...booksProviders,
    UsersService,
    ...usersProviders,
    ImagesService,
    ...imagesProviders,
    AuthService,
    ...authProviders,
    ...rolesProviders,
    ...usersrolesProviders,
    AuthRepository, 
    UsersRepository,
    UserRolesRepository,
    BooksRepository
  ]
}
)
export class AppModule { }
