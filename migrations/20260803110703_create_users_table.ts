import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
<<<<<<< HEAD
    table.string('username').unique().notNullable(); 
    table.string('password').notNullable();        
=======
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
    table.integer('age');
    table.string('role').defaultTo('user');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
<<<<<<< HEAD
}
=======
}
>>>>>>> 92569bd25d8bd5f8b9d7991a39458dce374ae539
