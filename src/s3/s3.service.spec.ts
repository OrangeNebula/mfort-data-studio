import { S3Service } from './s3.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../config/config.module';
import Util from '../core/Util';
import Rows from '../jobs/entity/rows';
import { ConfigService } from '../config/config.service';

describe('S3 서비스 모듈 테스트', () => {
  let service: S3Service;
  let config: ConfigService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [S3Service],
    }).compile();
    service = app.get<S3Service>(S3Service);
    config = app.get<ConfigService>(ConfigService);
  });

  test('S3 의 버킷 리스트를 정상적으로 조회할 수 있다.', async () => {
    await service.listBuckets();
  });

  test('S3 의 버킷으로 csv 데이터를 업로드 할 수 있다.', async () => {
    const rows = new Rows([
      { name: 'test1', value: '10' },
      { name: 'test2', phone: '010' },
    ]);
    await service.upload(`${config.getDataBucket()}/${Util.getYearMonthKey()}`,
      `${Util.getDay()}.csv`, rows.toCsv());
  });
})