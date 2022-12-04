import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Record, Health } from './records.model';

@Injectable()
export class RecordsService {
  private records: Record[] = [
    { id: '1', name: 'Matt', dob: '1953-02-28', health: Health.EXCELLENT },
  ];

  getAllRecords(): Record[] {
    return this.records;
  }

  createRecord(name: string, dob: string): Record {
    const rec: Record = {
      id: uuidv4(),
      name,
      dob,
      health: Health.UNKOWN,
    };

    this.records.push(rec);

    return rec;
  }
}
