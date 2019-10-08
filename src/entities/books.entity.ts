import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Books extends Model<Books> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: '_id',
  })
  _id: Number;
  
  @Column
  title: String;

  @Column
  amount: Number

  @Column
  price: Number;

  @Column
  description: String;

  @Column
  img: String

}