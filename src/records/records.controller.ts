import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { Record } from './records.model';
import { CreateRecordDto } from './dto/create.record.dto';
import { ReadRecordDto } from './dto/read.record.dto';
import { DeleteRecordDto } from './dto/delete.record.dto';

@Controller('records')
export class RecordsController {
  private recordsService: RecordsService;

  constructor(recordsService: RecordsService) {
    this.recordsService = recordsService;
  }

  @Get()
  getAllRecords(): Record[] {
    console.log('getAllRecords');
    return this.recordsService.getAllRecords();
  }

  @Get('/:id')
  getRecordById(@Param() readRecordDto: ReadRecordDto): Record {
    console.log('getRecordById');
    return this.recordsService.getRecordById(readRecordDto);
  }

  @Post()
  createRecord(@Body() createRecordDto: CreateRecordDto): Record {
    console.log('createRecord');
    return this.recordsService.createRecord(createRecordDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteRecord(@Param() deleteRecordDto: DeleteRecordDto): void {
    console.log('deleteRecord');
    this.recordsService.deleteRecord(deleteRecordDto);
  }
}
