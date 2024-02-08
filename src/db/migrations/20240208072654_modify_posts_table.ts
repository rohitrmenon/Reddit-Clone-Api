import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTableIfExists('posts');
};

export const down = async (knex: Knex): Promise<void> => {
    return knex.schema.createTable('posts', function (table) {
        table.increments('id').primary();
        table.string('title');
        table.text('content');
      });
}