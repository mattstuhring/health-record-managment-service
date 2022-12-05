import { Healthcare } from '../records.model';

export class GetRecordsFilterDto {
  healthcare?: Healthcare;
  search?: string;
}
