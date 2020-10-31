import { JobsRepository } from './jobs.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../../config/config.module';
import { JobsMapper } from './jobs.mapper';
import { StudioDbService } from '../../db/studio-db.service';

describe('작업 정보 리포지토리 모듈 테스트', () => {
  let repository: JobsRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [JobsRepository, JobsMapper, StudioDbService],
    }).compile();
    repository = app.get<JobsRepository>(JobsRepository);
  });

  test('건강성 지표 추출 작업 조회 테스트', async () => {
    const job = await repository.getJobById(1);
    expect(job).toBeTruthy();
  });
})