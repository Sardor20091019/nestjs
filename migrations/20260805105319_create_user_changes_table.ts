import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_changes', (table) => {
    table.increments('id').primary();
    table.integer('main_id').notNullable();
    table.jsonb('new_values').notNullable();
    table.jsonb('old_values').notNullable();
    table.integer('created_by').references('id').inTable('users');
    table
      .timestamp('created_at', { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_changes');
}
