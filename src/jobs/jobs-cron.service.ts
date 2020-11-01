import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { JobsRepository } from './repository/jobs.repository';
import { Injectable, Logger } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Injectable()
export class JobsCronService {
  private logger = new Logger(JobsCronService.name);

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private jobsRepository: JobsRepository,
    private jobsService: JobsService,
  ) {
    this.initialize();
  }

  async initialize() {
    this.logger.log('Initialize jobs');
    const jobs = await this.jobsRepository.getAllJobs();
    jobs.forEach((item) => {
      const cronJob = new CronJob(
        item.cron, async () => {
          await this.jobsService.runJob(item);
        }
      );
      this.schedulerRegistry.addCronJob(item.name, cronJob);
      this.logger.log(`Registered ${item.info}.`)
      cronJob.start();
    });
  }
}