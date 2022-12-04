import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post()
  createRecord(@Body('name') name: string, @Body('dob') dob: string): Record {
    return this.recordsService.createRecord(name, dob);
  }
}
