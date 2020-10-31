import Query from './query';

export default class Job {
  constructor(
    public readonly id: number,
    public readonly cron: string,
    public readonly name: string,
    public readonly queries: Query[],
  ) {}
}