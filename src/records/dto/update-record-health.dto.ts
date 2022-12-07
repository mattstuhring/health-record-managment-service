import { IsEnum } from 'class-validator';
import { Health } from '../record.model';

export class UpdateRecordHealthDto {
  @IsEnum(Health)
  health: Health;
}
