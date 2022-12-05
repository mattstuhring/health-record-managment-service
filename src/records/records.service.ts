import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Record, Health } from './records.model';
import { CreateRecordDto } from './dto/create.record.dto';
import { ReadRecordDto } from './dto/read.record.dto';
import { DeleteRecordDto } from './dto/delete.record.dto';
import { UpdateRecordDto } from './dto/update.record.dto';
import { UpdateRecordHealthDto } from './dto/update.record.health.dto';

@Injectable()
export class RecordsService {
  private records: Record[] = [];

  getAllRecords(): Record[] {
    return this.records;
  }

  getRecordById(readRecordDto: ReadRecordDto): Record {
    const { id } = readRecordDto;

    return this.records.find((obj) => {
      return obj.id === id;
    });
  }

  createRecord(createRecordDto: CreateRecordDto): Record {
    const { name, dob } = createRecordDto;

    const rec: Record = {
      id: uuidv4(),
      name,
      dob,
      health: Health.UNKOWN,
    };

    this.records.push(rec);

    return rec;
  }

  updateRecordHealth(
    updateRecordDto: UpdateRecordDto,
    updateRecordHealthDto: UpdateRecordHealthDto,
  ): Record {
    const readRecordDto: ReadRecordDto = {
      id: updateRecordDto.id,
    };
    const record: Record = this.getRecordById(readRecordDto);
    record.health = updateRecordHealthDto.health;

    return record;
  }

  deleteRecord(deleteRecordDto: DeleteRecordDto): void {
    this.records = this.records.filter((rec) => {
      return rec.id !== deleteRecordDto.id;
    });
  }
}
