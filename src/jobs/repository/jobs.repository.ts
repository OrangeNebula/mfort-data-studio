import { StudioDbService } from '../../db/studio-db.service';
import { Injectable } from '@nestjs/common';
import { JobsMapper } from './jobs.mapper';
import Job from '../entity/job';

@Injectable()
export class JobsRepository {
  constructor(
    private readonly db: StudioDbService,
    private readonly mapper: JobsMapper,
  ) {}

  async getJobById(id: number): Promise<Job | null> {
    const jobRows = await this.db.instance
      .select('id', 'cron', 'name')
      .from('cron_job')
      .where({
        id,
      });
    if (jobRows.length === 0) {
      return null;
    }
    const queries = await this.db.instance
      .select('name', 'query')
      .from('job_query')
      .where({
        jobId: id,
      });
    return this.mapper.toEntity(
      jobRows[0].id,
      jobRows[0].cron,
      jobRows[0].name,
      queries.map((item) => ({ name: item.name, query: item.query })),
    );
  }
}