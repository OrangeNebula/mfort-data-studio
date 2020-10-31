import Job from '../entity/job';
import { Injectable } from '@nestjs/common';
import Query from '../entity/query';

@Injectable()
export class JobsMapper {
  toEntity(id: number, cron: string, name: string, queries: {name: string, query: string}[]): Job {
    return new Job(
      id,
      cron,
      name,
      queries.map((item) => new Query(item.name, item.query)),
    );
  }
}