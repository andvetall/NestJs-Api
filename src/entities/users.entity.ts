import { Table, Column, Model, DataType, ForeignKey, BelongsToMany, BelongsTo } from 'sequelize-typescript';


@Table
export class Users_roles extends Model<Users_roles> {

  @ForeignKey(() => Users)
  @Column
  users_id: number;

  @ForeignKey(() => Roles)
  @Column
  roles_id: number;
}


@Table
export class Users extends Model<Users> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: '_id',
  })
  _id?: Number;

  @Column
  email: String;

  @Column
  password: String;

  @Column
  login?: String;

  @Column
  userImg?: String;

  @Column
  website?: String;

  @Column
  mobile?: String;

  @Column
  country?: String;

  @Column
  city?: String;

  @Column
  street?: String;

  @Column
  house?: String;

  @Column
  appartment?: String;


  @BelongsToMany(() => Roles, () => Users_roles)
  roleId: Users_roles[];

}

@Table
export class Roles extends Model<Roles> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'id',
  })
  _id: Number;

  @Column
  roleName: String


  @BelongsToMany(() => Users, () => Users_roles)
  datarole: Users[];
}

