import Util from './Util';
import MockDate from 'mockdate';

describe('Util 클래스 테스트', () => {
  MockDate.set('2020-01-01');

  test('년도, 달 값으로 구성된 키 구성하기', () => {
    expect(Util.getYearMonthKey()).toBe('202001');
  });

  test('년도, 달, 일 값으로 구성된 키 구성하기', () => {
    expect(Util.getYearMonthDayKey()).toBe('20200101');
  });
});
