import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("comments", (table) => {
    table.string("id").primary();
    table.string("text").notNullable();
    table.string("createdAt").notNullable()
    table.string("authorId").notNullable().references("id").inTable("users");
    table.string("postId").notNullable().references("id").inTable("posts");
    table.string("replyToId").references("id").inTable("comments");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("comments");
}
