import { Injectable, Logger } from '@nestjs/common';
import Job from './entity/job';
import { JobsRepository } from './repository/jobs.repository';
import { S3Service } from '../s3/s3.service';
import { ServiceRepository } from './repository/service.repository';
import Util from '../core/Util';
import { ConfigService } from '../config/config.service';

@Injectable()
export class JobsService {
  constructor(
    private jobsRepository: JobsRepository,
    private serviceRepository: ServiceRepository,
    private s3Service: S3Service,
    private config: ConfigService,
  ) {}

  getJob(id: number): Promise<Job | null> {
    return this.jobsRepository.getJobById(id);
  }

  async runJob(job: Job): Promise<void> {
    // Note. Promise.all 로 수행하면 더 빠르게 수행가능하지만,
    // 현재 쿼리들이 DB에 로드에 너무 많이 주고 있다
    /*const promises = job.queries.map(async (item) => {
      Logger.debug(item.name);
      const result = await this.serviceRepository.executeQuery(item.query);
      await this.s3Service.upload(
        `${this.config.getDataBucket()}/${Util.getYearMonthDayKey()}`,
        item.name,
        result.toCsv(),
      );
    });
    await Promise.all(promises);*/
    for (const item of job.queries) {
      Logger.log(item.name);
      const result = await this.serviceRepository.executeQuery(item.query);
      await this.s3Service.upload(
        `${this.config.getDataBucket()}/${Util.getYearMonthDayKey()}`,
        `${item.name}.csv`,
        result.toCsv(),
      );
    }
  }
}