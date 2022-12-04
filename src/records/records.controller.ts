import { Controller, Get } from '@nestjs/common';
import { RecordsService, Record } from './records.service';

@Controller('records')
export class RecordsController {
  private recordsService: RecordsService;

  constructor(recordsService: RecordsService) {
    this.recordsService = recordsService;
  }

  @Get()
  public getAllRecords(): Record[] {
    return this.recordsService.getAllRecords();
  }
}
