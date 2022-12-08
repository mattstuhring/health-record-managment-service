import { IsEnum } from 'class-validator';
import { Health } from '../record-health.enum';

export class UpdateRecordHealthDto {
  @IsEnum(Health)
  health: Health;
}
