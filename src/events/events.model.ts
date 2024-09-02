import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';


@Table({
  tableName: 'events',
})
export class Events extends Model<Events> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING), 
  })
  images: string[];

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endDate: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  totalGuests: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date;

}