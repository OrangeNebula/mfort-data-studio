import { ConfigManager } from '@nestjsplus/config';
import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService extends ConfigManager {
  public provideConfigSpec(environment: any) {
    return {
      SERVICE_DB_HOST: {
        validate: Joi.string(),
        required: false,
        default: 'localhost',
      },
      SERVICE_DB_USERNAME: {
        validate: Joi.string(),
        required: true,
      },
      SERVICE_DB_PASSWORD: {
        validate: Joi.string(),
        required: true,
      },
      SERVICE_DB_NAME: {
        validate: Joi.string(),
        required: true,
      },
      STUDIO_DB_HOST: {
        validate: Joi.string(),
        required: false,
        default: 'localhost',
      },
      STUDIO_DB_USERNAME: {
        validate: Joi.string(),
        required: true,
      },
      STUDIO_DB_PASSWORD: {
        validate: Joi.string(),
        required: true,
      },
      STUDIO_DB_NAME: {
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

  public getServiceDbOptions() {
    return {
      host: this.get<string>('SERVICE_DB_HOST'),
      user: this.get<string>('SERVICE_DB_USERNAME'),
      password: this.get<string>('SERVICE_DB_PASSWORD'),
      database: this.get<string>('SERVICE_DB_NAME'),
    }
  }

  public getStudioDbOptions() {
    return {
      host: this.get<string>('STUDIO_DB_HOST'),
      user: this.get<string>('STUDIO_DB_USERNAME'),
      password: this.get<string>('STUDIO_DB_PASSWORD'),
      database: this.get<string>('STUDIO_DB_NAME'),
    }
  }
}