import { Healthcare } from '../record.model';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateRecordDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  dob: string;

  @IsNotEmpty()
  @IsEnum(Healthcare)
  healthcare: Healthcare;
}
