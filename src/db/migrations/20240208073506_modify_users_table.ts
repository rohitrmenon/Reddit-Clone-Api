import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTableIfExists('users');
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('name').notNullable();
    table.string('status').notNullable();
    table.string('password').notNullable();
  });
};
