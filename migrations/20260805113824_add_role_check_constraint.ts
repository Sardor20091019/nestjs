import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    ALTER TABLE users 
    ADD CONSTRAINT check_valid_role 
    CHECK (role IN ('admin', 'user', 'Admin', 'User'));
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    ALTER TABLE users 
    DROP CONSTRAINT check_valid_role;
  `);
}
