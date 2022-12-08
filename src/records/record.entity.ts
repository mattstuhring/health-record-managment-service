import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Health } from './record-health.enum';
import { Healthcare } from './record-healthcare.enum';

@Entity()
export class Record {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  dob: string;

  @Column()
  healthcare: Healthcare;

  @Column()
  health: Health;
}
