/* eslint-disable @typescript-eslint/no-unused-vars */
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('users', (table) => {})
    .then(() => {
      return knex.raw(
        'ALTER TABLE users ADD CONSTRAINT check_valid_role CHECK (role IN (1, 2))',
      );
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('users', (table) => {})
    .then(() => {
      return knex.raw(
        'ALTER TABLE users DROP CONSTRAINT IF EXISTS check_valid_role',
      );
    });
}
