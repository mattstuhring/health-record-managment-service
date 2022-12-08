import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Healthcare } from '../record-healthcare.enum';

export class GetRecordsFilterDto {
  @IsOptional()
  @IsEnum(Healthcare)
  healthcare?: Healthcare;

  @IsOptional()
  @IsString()
  search?: string;
}
