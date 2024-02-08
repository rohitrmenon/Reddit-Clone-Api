import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  
  await knex.schema.dropTableIfExists('users');

  await knex.schema.createTable('users', function (table) {
    table.string('id').primary();
    table.string('email').notNullable().unique();
    table.string('name').notNullable();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('image');
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTableIfExists('users');
};
