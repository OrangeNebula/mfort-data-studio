import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { DbModule } from '../db/db.module';
import { S3Module } from '../s3/s3.module';
import { JobsRepository } from './repository/jobs.repository';
import { ServiceRepository } from './repository/service.repository';
import { JobsMapper } from './repository/jobs.mapper';
import { RowsMapper } from './repository/rows.mapper';
import { JobsCronService } from './jobs-cron.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule,
    DbModule,
    S3Module,
  ],
  controllers: [JobsController],
  providers: [
    JobsService,
    JobsCronService,
    JobsRepository,
    ServiceRepository,
    JobsMapper,
    RowsMapper,
  ],
  exports: [
    JobsService,
    JobsCronService,
  ],
})
export class JobsModule {}
