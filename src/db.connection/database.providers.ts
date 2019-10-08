import { Sequelize } from 'sequelize-typescript';
import { Books } from '../entities/books.entity';
import { Users, Users_roles, Roles } from '../entities/users.entity';
import { Images } from 'src/entities/images.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: "127.0.0.1",
        port: 3306,
        username: "vitalii",
        password: "qwerty",
        database: "booksDb",
        define: {
          timestamps: false
        }
      });
      sequelize.addModels([Books, Users, Users_roles, Roles, Images]);
      await sequelize.sync();
      return sequelize;
    },
  }
];