import 'dotenv/config';
import { Knex } from 'knex';
import { config } from './src/config/config';

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    connectionString: config.DATABASE_URL,
    host: config.DB_HOST,
    port: Number(config.DB_PORT),
    user: config.DB_USER,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
    ssl: config.DB_SSL ? { rejectUnauthorized: false } : false,
  },
  migrations: {
    directory: './migrations',
    extension: 'ts',
  },
};

export default knexConfig;
