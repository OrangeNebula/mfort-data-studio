import { DateTime } from 'luxon';

class Util {
  getYearMonthKey() {
    return DateTime.local().toFormat('yyyyLL');
  }

  getYearMonthDayKey() {
    return DateTime.local().toFormat('yyyyLLdd');
  }

  getDay() {
    return DateTime.local().toFormat('dd');
  }
}

export default new Util();