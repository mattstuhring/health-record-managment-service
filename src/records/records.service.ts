import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Record, Health } from './records.model';
import { CreateRecordDto } from './dto/create-record.dto';
import { GetRecordDto } from './dto/get-record.dto';
import { DeleteRecordDto } from './dto/delete-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { UpdateRecordHealthDto } from './dto/update-record-health.dto';
import { GetRecordsFilterDto } from './dto/get-records-filter.dto';

@Injectable()
export class RecordsService {
  private records: Record[] = [];

  getAllRecords(): Record[] {
    return this.records;
  }

  getRecordById(getRecordDto: GetRecordDto): Record {
    const { id } = getRecordDto;

    const record: Record = this.records.find((obj) => {
      return obj.id === id;
    });

    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    return record;
  }

  getRecordsWithFilters(getRecordsFilterDto: GetRecordsFilterDto): Record[] {
    const { healthcare, search } = getRecordsFilterDto;
    let records: Record[] = this.getAllRecords();

    if (healthcare) {
      records = records.filter((rec) => {
        return rec.healthcare === healthcare;
      });
    }

    if (search) {
      records = records.filter((rec) => {
        return (
          rec.dob.includes(search) ||
          rec.health.includes(search) ||
          rec.name.includes(search)
        );
      });
    }

    return records;
  }

  createRecord(createRecordDto: CreateRecordDto): Record {
    const { name, dob, healthcare } = createRecordDto;

    const rec: Record = {
      id: uuidv4(),
      name,
      dob,
      healthcare,
      health: Health.UNKNOWN,
    };

    this.records.push(rec);

    return rec;
  }

  updateRecordHealth(
    updateRecordDto: UpdateRecordDto,
    updateRecordHealthDto: UpdateRecordHealthDto,
  ): Record {
    const getRecordDto: GetRecordDto = {
      id: updateRecordDto.id,
    };

    const record: Record = this.getRecordById(getRecordDto);

    this.records = this.records.map((rec) => {
      if (rec.id === record.id) {
        rec.health = updateRecordHealthDto.health;
      }

      return rec;
    });

    return record;
  }

  deleteRecord(deleteRecordDto: DeleteRecordDto): void {
    const getRecordById: GetRecordDto = { id: deleteRecordDto.id };

    // Check if record ID exists
    const record = this.getRecordById(getRecordById);

    // If yes, then delete record
    this.records = this.records.filter((rec) => {
      return rec.id !== record.id;
    });
  }
}
