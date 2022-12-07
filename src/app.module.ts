import { Module } from '@nestjs/common';
import { RecordsModule } from './records/records.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    RecordsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'mattstuhring',
      database: 'health-record-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
