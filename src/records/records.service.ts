import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Record, Health } from './records.model';
import { CreateRecordDto } from './dto/create.record.dto';
import { ReadRecordDto } from './dto/read.record.dto';
import { DeleteRecordDto } from './dto/delete.record.dto';

@Injectable()
export class RecordsService {
  private records: Record[] = [];

  getAllRecords(): Record[] {
    return this.records;
  }

  getRecordById(readRecordDto: ReadRecordDto): Record {
    return this.records.find((obj) => {
      return obj.id == readRecordDto.id;
    });
  }

  createRecord(createRecordDto: CreateRecordDto): Record {
    const { name, dob } = createRecordDto;

    console.log(createRecordDto.dob);
    const rec: Record = {
      id: uuidv4(),
      name,
      dob,
      health: Health.UNKOWN,
    };

    this.records.push(rec);

    return rec;
  }

  deleteRecord(deleteRecordDto: DeleteRecordDto): void {
    this.records = this.records.filter((rec) => {
      return rec.id !== deleteRecordDto.id;
    });
  }
}
