import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("subreddits", (table) => {
      table.string("id").primary();
      table.string("name").notNullable().unique();
      table.string("creator_id").notNullable().references("id").inTable("users");
      table.string('created_at').notNullable(); 
      table.string('updated_at').notNullable(); 
    })
    .then(() => {
      return knex.schema.alterTable("posts", (table) => {
        table.string("subreddit_id").references("id").inTable("subreddits");
      });
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .then(() => {
      return knex.schema.dropTableIfExists("subreddits");
    });
}
