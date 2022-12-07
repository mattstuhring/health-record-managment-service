import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './record.entity';

@Injectable()
export class RecordsRepository {
  private recordsRepository: Repository<Record>;

  constructor(@InjectRepository(Record) recordsRepository: Repository<Record>) {
    this.recordsRepository = recordsRepository;
  }
}
