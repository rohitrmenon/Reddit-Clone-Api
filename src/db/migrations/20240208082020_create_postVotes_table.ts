import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("postVotes", (table) => {
    table.string("id").primary();
    table.string("userId").notNullable().references("id").inTable("users");
    table.string("postId").notNullable().references("id").inTable("posts");
    table.enum("type", ["UP", "DOWN"]).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("postVotes");
}
