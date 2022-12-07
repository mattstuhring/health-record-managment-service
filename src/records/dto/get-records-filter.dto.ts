import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Healthcare } from '../record.model';

export class GetRecordsFilterDto {
  @IsOptional()
  @IsEnum(Healthcare)
  healthcare?: Healthcare;

  @IsOptional()
  @IsString()
  search?: string;
}
