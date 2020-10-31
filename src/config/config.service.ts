import { ConfigManager } from '@nestjsplus/config';
import * as Joi from '@hapi/joi';
import { KnexOptions, KnexOptionsFactory } from '@nestjsplus/knex';
import { Injectable } from '@nestjs/common';
import { S3Options } from '../s3/interface/S3Options';

@Injectable()
export class ConfigService extends ConfigManager implements KnexOptionsFactory {
  public provideConfigSpec(environment: any) {
    return {
      DB_HOST: {
        validate: Joi.string(),
        required: false,
        default: 'localhost',
      },
      DB_PORT: {
        validate: Joi.number()
          .min(3306)
          .max(65535),
        required: false,
        default: 3306,
      },
      DB_USERNAME: {
        validate: Joi.string(),
        required: true,
      },
      DB_PASSWORD: {
        validate: Joi.string(),
        required: true,
      },
      DB_NAME: {
        validate: Joi.string(),
        required: true,
      },
      AWS_ACCESS_KEY_ID: {
        validate: Joi.string(),
        required: true,
      },
      AWS_SECRET_ACCESS_KEY: {
        validate: Joi.string(),
        required: true,
      },
      DATA_BUCKET: {
        validate: Joi.string(),
        required: true,
      }
    };
  }

  public getDataBucket(): string {
    return this.get<string>('DATA_BUCKET');
  }

  public getS3Options(): S3Options {
    return {
      accessKeyId: this.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: 'ap-northeast-2',
    }
  }

  public createKnexOptions(): KnexOptions {
    return {
      client: 'mysql',
      debug: true,
      connection: {
        host: this.get<string>('DB_HOST'),
        user: this.get<string>('DB_USERNAME'),
        password: this.get<string>('DB_PASSWORD'),
        database: this.get<string>('DB_NAME'),
        port: this.get<number>('DB_PORT'),
      },
    };
  }
}