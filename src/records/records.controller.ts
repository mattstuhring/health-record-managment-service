import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  Patch,
  Query,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { Record } from './record.model';
import { CreateRecordDto } from './dto/create-record.dto';
import { GetRecordDto } from './dto/get-record.dto';
import { DeleteRecordDto } from './dto/delete-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { UpdateRecordHealthDto } from './dto/update-record-health.dto';
import { GetRecordsFilterDto } from './dto/get-records-filter.dto';

@Controller('records')
export class RecordsController {
  private recordsService: RecordsService;

  constructor(recordsService: RecordsService) {
    this.recordsService = recordsService;
  }

  @Get()
  getRecords(@Query() getRecordsFilterDto: GetRecordsFilterDto): Record[] {
    console.log('getAllRecords');

    if (Object.keys(getRecordsFilterDto).length > 0) {
      // Apply records filtering based on query params
      return this.recordsService.getRecordsWithFilters(getRecordsFilterDto);
    } else {
      // Otherwise get all records
      return this.recordsService.getAllRecords();
    }
  }

  @Get('/:id')
  getRecordById(@Param() getRecordDto: GetRecordDto): Record {
    console.log('getRecordById');
    return this.recordsService.getRecordById(getRecordDto);
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
