import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3();
  }

  upload(location: string, key: string, data: any) {
    return new Promise((resolve, reject) => {
      this.s3.putObject({
        ACL: 'authenticated-read',
        Body: data,
        Bucket: location,
        Key: key,
      }, (err) => {
        if (err) {
          Logger.error(err);
          reject(err);
        } else {
          resolve();
        }
      })
    });
  }

  listBuckets() {
    return new Promise((resolve, reject) => {
      this.s3.listBuckets((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}