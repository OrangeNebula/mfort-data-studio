import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { ConfigModule } from './config/config.module';
import { S3Module } from './s3/s3.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule,
    DbModule,
    S3Module,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
