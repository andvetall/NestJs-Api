import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Images extends Model<Images> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: '_id',
  })
  _id: Number;
  
  @Column
  img: String;


}