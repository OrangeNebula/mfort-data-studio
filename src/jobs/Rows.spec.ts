import Rows from './Rows';

describe('Rows 도메인 엔티티 테스트', () => {
  test('json 데이터를 csv 로 변환', () => {
    expect(Rows.toCsv([
      { name: 'test1', value: '10' },
      { name: 'test2', phone: '010' },
    ])).toBe('"name","value","phone"\r\n"test1","10",\r\n"test2",,"010"');
  });
});