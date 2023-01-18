import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { QueryModel } from './database';
import { CONNECTION_POOL } from './database.definition';

@Injectable()
export class DatabaseService {
  constructor(@Inject(CONNECTION_POOL) private readonly pool: Pool) {}

  async query(queryModel: QueryModel) {
    try {
      console.log('executing query', queryModel.query, queryModel.values);
      const client = await this.pool.connect();
      return await client.query(queryModel.query, queryModel.values);
    } catch (e) {
      console.log('error executing query', e);

      throw e;
    }
  }
}
