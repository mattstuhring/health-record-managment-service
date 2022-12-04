import { Injectable } from '@nestjs/common';
import { Record, Health } from './records.model';

@Injectable()
export class RecordsService {
  private records: Record[] = [
    { id: '1', name: 'Matt', dob: '1953-02-28', health: Health.EXCELLENT },
  ];

  public getAllRecords(): Record[] {
    return this.records;
  }
}
