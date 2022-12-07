import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Health, Healthcare } from './record.model';

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
