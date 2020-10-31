import { ConfigService } from '../config/config.service';
import * as Knex from 'knex';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ServiceDbService {
  private logger: Logger;

  public instance: Knex;

  constructor(
    private readonly config: ConfigService,
  ) {
    this.instance = Knex({
      client: 'mysql',
      connection: config.getServiceDbOptions(),
    });
    this.logger = new Logger(ServiceDbService.name);
  }
}