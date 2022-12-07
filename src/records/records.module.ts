import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsController } from './records.controller';
import { RecordsRepository } from './records.repository';
import { RecordsService } from './records.service';

@Module({
  controllers: [RecordsController],
  providers: [RecordsService],
  imports: [TypeOrmModule.forFeature([RecordsRepository])],
})
export class RecordsModule {}
