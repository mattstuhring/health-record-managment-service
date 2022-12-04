import { Controller, Get } from '@nestjs/common';
import { RecordsService } from './records.service';
import { Record } from './records.model';

@Controller('records')
export class RecordsController {
  private recordsService: RecordsService;

  constructor(recordsService: RecordsService) {
    this.recordsService = recordsService;
  }

  @Get()
  getAllRecords(): Record[] {
    return this.recordsService.getAllRecords();
  }
}
