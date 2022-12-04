import { Injectable } from '@nestjs/common';

export interface Record {
  id: string;
  name: string;
}

@Injectable()
export class RecordsService {
  private records: Record[] = [{ id: '1', name: 'Matt' }];

  public getAllRecords(): Record[] {
    return this.records;
  }
}
