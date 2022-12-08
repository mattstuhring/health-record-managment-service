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
import { Record } from './record.entity';
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
  getRecords(
    @Query() getRecordsFilterDto: GetRecordsFilterDto,
  ): Promise<Record[]> {
    return this.recordsService.getRecords(getRecordsFilterDto);
  }

  @Get('/:id')
  getRecordById(@Param() getRecordDto: GetRecordDto): Promise<Record> {
    return this.recordsService.getRecordById(getRecordDto);
  }

  @Post()
  createRecord(@Body() createRecordDto: CreateRecordDto): Promise<Record> {
    return this.recordsService.createRecord(createRecordDto);
  }

  @Patch('/:id/health')
  updateRecordHealth(
    @Param() updateRecordDto: UpdateRecordDto,
    @Body() updateRecordHealthDto: UpdateRecordHealthDto,
  ): Promise<Record> {
    return this.recordsService.updateRecordHealth(
      updateRecordDto,
      updateRecordHealthDto,
    );
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteRecord(@Param() deleteRecordDto: DeleteRecordDto): Promise<void> {
    return this.recordsService.deleteRecord(deleteRecordDto);
  }
}
