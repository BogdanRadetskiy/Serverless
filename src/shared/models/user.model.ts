import {
    Column,
    DataType,
    Model,
    Table,
  } from 'sequelize-typescript';
  
  @Table
  export class User extends Model {
     
    @Column({
      type: DataType.STRING,
    })
    name: string;

    @Column({
        type: DataType.STRING,
      })
    lastName: string;
  }
  