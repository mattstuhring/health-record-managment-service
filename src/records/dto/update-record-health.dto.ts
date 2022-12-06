import { IsEnum } from 'class-validator';
import { Health } from '../records.model';

export class UpdateRecordHealthDto {
  @IsEnum(Health)
  health: Health;
}
