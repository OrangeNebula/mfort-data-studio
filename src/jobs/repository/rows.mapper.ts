import { Injectable } from '@nestjs/common';
import Rows from '../entity/rows';

@Injectable()
export class RowsMapper {
  toEntity(rows: any[]): Rows {
    return new Rows(rows);
  }
}