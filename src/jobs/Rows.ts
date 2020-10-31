import { Parser } from 'json2csv';

export default class Rows {
  constructor(
    public readonly row: any[],
  ) {
  }

  static toCsv(rows: any[]) {
    const parser = new Parser();
    return parser.parse(rows);
  }
}