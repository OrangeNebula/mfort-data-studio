import { Module } from '@nestjs/common';
import { ServiceDbService } from './service-db.service';
import { StudioDbService } from './studio-db.service';

@Module({
  providers: [ServiceDbService, StudioDbService],
  exports: [ServiceDbService, StudioDbService],
})
export class DbModule {}