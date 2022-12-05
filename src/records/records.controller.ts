import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { Record } from './records.model';
import { CreateRecordDto } from './dto/create.record.dto';
import { ReadRecordDto } from './dto/read.record.dto';
import { DeleteRecordDto } from './dto/delete.record.dto';
import { UpdateRecordDto } from './dto/update.record.dto';
import { UpdateRecordHealthDto } from './dto/update.record.health.dto';

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

  @Patch('/:id/health')
  updateRecordHealth(
    @Param() updateRecordDto: UpdateRecordDto,
    @Body() updateRecordHealthDto: UpdateRecordHealthDto,
  ): Record {
    console.log('updateRecord');
    return this.recordsService.updateRecordHealth(
      updateRecordDto,
      updateRecordHealthDto,
    );
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteRecord(@Param() deleteRecordDto: DeleteRecordDto): void {
    console.log('deleteRecord');
    this.recordsService.deleteRecord(deleteRecordDto);
  }
}
