import { Injectable } from '@nestjs/common';
import { ServiceDbService } from '../../db/service-db.service';
import { RowsMapper } from './rows.mapper';
import Rows from '../entity/rows';

@Injectable()
export class ServiceRepository {
  constructor(
    private readonly db: ServiceDbService,
    private readonly mapper: RowsMapper,
  ) {}

  async executeQuery(query: string): Promise<Rows> {
    const results = await this.db.instance.raw(query);
    return this.mapper.toEntity(results[0]);
  }
}