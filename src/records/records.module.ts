import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsController } from './controllers/records.controller';
import { Record } from './entity/record.entity';
import { RecordsService } from './providers/records.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RecordsController],
  providers: [RecordsService],
  imports: [TypeOrmModule.forFeature([Record]), AuthModule],
})
export class RecordsModule {}
