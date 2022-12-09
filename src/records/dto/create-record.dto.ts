import { Healthcare } from '../record-healthcare.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateRecordDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsEnum(Healthcare)
  typeOfCare: Healthcare;
}
