import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Healthcare } from '../records.model';

export class GetRecordsFilterDto {
  @IsOptional()
  @IsEnum(Healthcare)
  healthcare?: Healthcare;

  @IsOptional()
  @IsString()
  search?: string;
}
