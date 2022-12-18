import { Healthcare } from '../records/constants/record-healthcare.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column({ name: 'type_of_care' })
  typeOfCare: Healthcare;

  @Column({ name: 'is_paid' })
  isPaid: boolean;

  @Column({ name: 'date_time', type: 'timestamptz', precision: 3 })
  dateTime: Date;

  @CreateDateColumn({ name: 'created_at' })
  createDate: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updateDate: Date;

  @ManyToOne(() => User, (user) => user.appointments, { eager: false })
  @Exclude()
  user: User;
}
