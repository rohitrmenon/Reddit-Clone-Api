import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("subreddits", (table) => {
      table.string("id").primary();
      table.string("name").notNullable();
      table.string("creatorId").notNullable().references("id").inTable("users");
      table.string('createdAt').notNullable(); 
      table.string('updatedAt').notNullable(); 
    })
    .then(() => {
      return knex.schema.alterTable("posts", (table) => {
        table.string("subredditId").references("id").inTable("subreddits");
      });
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .then(() => {
      return knex.schema.dropTableIfExists("subreddits");
    });
}
