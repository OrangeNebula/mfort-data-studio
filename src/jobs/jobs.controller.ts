import { Controller, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { JobsService } from './jobs.service';

@Controller()
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
  ) {}

  @Post('/jobs/:id')
  async runJob(@Param('id') id: number, @Res() res: Response): Promise<void> {
    const job = await this.jobsService.getJob(id);
    if (!job) {
      res.status(404).end();
      return;
    }
    await this.jobsService.runJob(job);
    res.status(201).end();
    return;
  }
}