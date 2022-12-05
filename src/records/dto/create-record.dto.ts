import { Healthcare } from '../records.model';

export class CreateRecordDto {
  name: string;
  dob: string;
  healthcare: Healthcare;
}
