import { Healthcare } from '../records.model';
import { IsNotEmpty } from 'class-validator';

export class CreateRecordDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  dob: string;

  @IsNotEmpty()
  healthcare: Healthcare;
}
