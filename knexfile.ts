import 'dotenv/config';
import { Knex } from 'knex';

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
  migrations: {
    directory: './migrations',
    extension: 'ts',
  },
};

export default knexConfig;
