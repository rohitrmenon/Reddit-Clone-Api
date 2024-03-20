import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.alterTable('posts', function (table) {
    table.integer('votes_count').defaultTo(0); 
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.alterTable('posts', function (table) {
    table.dropColumn('votes_count');
  });
};
