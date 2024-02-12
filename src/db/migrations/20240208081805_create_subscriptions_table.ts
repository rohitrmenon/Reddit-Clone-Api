import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("subscriptions", (table) => {
    table.string("id").primary();
    table.string("user_id").notNullable().references("id").inTable("users");
    table.string("subreddit_id").notNullable().references("id").inTable("subreddits");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("subscriptions");
}
