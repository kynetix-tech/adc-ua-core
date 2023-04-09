import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarMakeEntity } from './car-make.entity';

@Entity('car_model')
export class CarModelEntity {
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

  @ManyToOne(() => CarMakeEntity, (make) => make.models)
  @JoinColumn({ name: 'make_id' })
  make: CarMakeEntity;
}
