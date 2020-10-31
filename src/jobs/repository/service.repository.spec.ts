import { ServiceRepository } from './service.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '../../config/config.module';
import { RowsMapper } from './rows.mapper';
import { ServiceDbService } from '../../db/service-db.service';

describe('서비스 DB 에서 정보 추출', () => {
  let repository: ServiceRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ServiceRepository, RowsMapper, ServiceDbService],
    }).compile();
    repository = app.get<ServiceRepository>(ServiceRepository);
  });

  test('건강_1_부모회원_아이연령별_가입자수 정보 추출 테스트', async () => {
    const query = `select dd,
coalesce(sum(case when (pp <= 0) then ci else null end),0) as preg,
coalesce(sum(case when (pp between 1 and 7) then ci else null end),0) + coalesce(MAX(case when childageid = 1 then ci else null end),0) as newborn, 
coalesce(sum(case when pp between 7 and 37 then ci else null end),0) + coalesce(MAX(case when childageid = 2 then ci else null end),0) as toddler,
coalesce(sum(case when pp between 37 and 79 then ci else null end),0) + coalesce(MAX(case when childageid = 3 then ci else null end),0) as kid,
coalesce(sum(case when pp >= 79 then ci else null end),0) + coalesce(MAX(case when childageid = 4 then ci else null end),0) as element

from (
select date_format(usersignupdate, '%x-%v') as dd, pp, childageid, count(distinct(childid)) as ci from (

select childbirthday, usersignupdate, timestampdiff(month, childbirthday, usersignupdate) as pp, childageid, childid
from momsitter.momsitter_user as u join momsitter.momsitter_parent_child_info as c on u.userid = c.userid) as t1
group by dd, pp, childageid) as t1
group by dd ;`;
    const rows = await repository.executeQuery(query);
    expect(rows).toBeTruthy();
  });
})