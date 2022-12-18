import { Entity } from 'typeorm';

@Entity()
export class Payment {
  id: string;

  name: string;
}
