import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { GdriveModule } from './gdrive/gdrive.module';

@Module({
  imports: [JobsModule, GdriveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
