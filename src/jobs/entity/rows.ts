import { Parser } from 'json2csv';

export default class Rows {
  constructor(
    public readonly rows: any[],
  ) {
  }

  toCsv() {
    const parser = new Parser();
    return parser.parse(this.rows);
  }
}