import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("comments", (table) => {
    table.string("id").primary();
    table.string("text").notNullable();
    table.string("created_at").notNullable()
    table.string("author_id").notNullable().references("id").inTable("users");
    table.string("post_id").notNullable().references("id").inTable("posts");
    table.string("reply_to_id").references("id").inTable("comments");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("comments");
}
