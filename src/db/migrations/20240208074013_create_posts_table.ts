import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('posts', function (table) {
    table.string('id').primary();
    table.string('title').notNullable();
    table.jsonb('content').notNullable(); 
    table.string('createdAt').notNullable(); 
    table.string('updatedAt').notNullable(); 
    table.string('authorId').notNullable().references('id').inTable('users');
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('posts');
};
