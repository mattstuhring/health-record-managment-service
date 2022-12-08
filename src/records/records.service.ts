import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Health } from './record-health.enum';
import { CreateRecordDto } from './dto/create-record.dto';
import { GetRecordDto } from './dto/get-record.dto';
import { DeleteRecordDto } from './dto/delete-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { UpdateRecordHealthDto } from './dto/update-record-health.dto';
import { GetRecordsFilterDto } from './dto/get-records-filter.dto';
import { Record } from './record.entity';

@Injectable()
export class RecordsService {
  private recordsRepository: Repository<Record>;

  constructor(@InjectRepository(Record) recordsRepository: Repository<Record>) {
    this.recordsRepository = recordsRepository;
  }

  async getRecords(
    getRecordsFilterDto: GetRecordsFilterDto,
  ): Promise<Record[]> {
    const { healthcare, search } = getRecordsFilterDto;
    const query = this.recordsRepository.createQueryBuilder('record');

    // Case insensitive search using LOWER()
    if (healthcare) {
      query.andWhere('LOWER(record.healthcare) = LOWER(:healthcare)', {
        healthcare,
      });
    }

    // Case insensitive search using LOWER()
    if (search) {
      query.andWhere(
        'LOWER(record.name) = LOWER(:name) OR LOWER(record.dob) = LOWER(:dob) OR LOWER(record.health) = LOWER(:health)',
        { name: search, dob: search, health: search },
      );
    }

    return await query.getMany();
  }

  async getRecordById(getRecordDto: GetRecordDto): Promise<Record> {
    const { id } = getRecordDto;
    const record: Record = await this.recordsRepository.findOne({
      where: {
        id,
      },
    });

    if (!record) {
      throw new NotFoundException(`Record with ID: ${id} not found`);
    }

    return record;
  }

  async createRecord(createRecordDto: CreateRecordDto): Promise<Record> {
    const { name, dob, healthcare } = createRecordDto;
    const record = this.recordsRepository.create({
      name,
      dob,
      healthcare,
      health: Health.UNKNOWN,
    });

    await this.recordsRepository.save(record);

    return record;
  }

  async deleteRecord(deleteRecordDto: DeleteRecordDto): Promise<void> {
    const { id } = deleteRecordDto;
    const result = await this.recordsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Record with ID: ${id} not found`);
    }

    return;
  }

  async updateRecordHealth(
    updateRecordDto: UpdateRecordDto,
    updateRecordHealthDto: UpdateRecordHealthDto,
  ): Promise<Record> {
    const { health } = updateRecordHealthDto;
    const record = await this.getRecordById(updateRecordDto);
    record.health = health;

    await this.recordsRepository.save(record);

    return record;
  }
}
