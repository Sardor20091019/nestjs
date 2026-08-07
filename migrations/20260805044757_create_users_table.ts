import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.string('email').unique();
      table.integer('age');
      table.integer('role').defaultTo(2).notNullable();
      table.timestamps(true, true);
    })
    .then(() => {
      return knex.raw(
        'ALTER TABLE users ADD CONSTRAINT check_role CHECK (role IN (1, 2))',
      );
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
