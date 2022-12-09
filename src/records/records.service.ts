import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthStatus } from './record-health-status.enum';
import { CreateRecordDto } from './dto/create-record.dto';
import { GetRecordDto } from './dto/get-record.dto';
import { DeleteRecordDto } from './dto/delete-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { UpdateRecordHealthDto } from './dto/update-record-health.dto';
import { GetRecordsFilterDto } from './dto/get-records-filter.dto';
import { Record } from './record.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class RecordsService {
  private recordsRepository: Repository<Record>;

  constructor(@InjectRepository(Record) recordsRepository: Repository<Record>) {
    this.recordsRepository = recordsRepository;
  }

  async getRecords(
    getRecordsFilterDto: GetRecordsFilterDto,
  ): Promise<Record[]> {
    const { typeOfCare, search } = getRecordsFilterDto;
    const query = this.recordsRepository.createQueryBuilder('record');

    // Case insensitive search using LOWER()
    if (typeOfCare) {
      query.andWhere('LOWER(record.typeOfCare) = LOWER(:typeOfCare)', {
        typeOfCare,
      });
    }

    // Case insensitive search using LOWER()
    if (search) {
      query.andWhere(
        'LOWER(record.name) = LOWER(:name) OR LOWER(record.dateOfBirth) = LOWER(:dateOfBirth) OR LOWER(record.healthStatus) = LOWER(:healthStatus)',
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

  async createRecord(
    createRecordDto: CreateRecordDto,
    user: User,
  ): Promise<Record> {
    const { name, dateOfBirth, typeOfCare } = createRecordDto;
    const { username } = user;
    const record = this.recordsRepository.create({
      name,
      dateOfBirth,
      typeOfCare,
      healthStatus: HealthStatus.UNKNOWN,
      updatedBy: username,
      user,
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
    const { healthStatus } = updateRecordHealthDto;
    const record = await this.getRecordById(updateRecordDto);
    record.healthStatus = healthStatus;

    await this.recordsRepository.save(record);

    return record;
  }
}
