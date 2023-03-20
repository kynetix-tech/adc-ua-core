import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CarModelEntity } from './car-model.entity';

@Entity('car_make')
export class CarMakeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 55,
    nullable: false,
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 55,
    nullable: false,
  })
  title: string;

  @OneToMany(() => CarModelEntity, (model) => model.make)
  models: Array<CarModelEntity>;
}
