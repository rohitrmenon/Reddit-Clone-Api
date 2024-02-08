import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("commentVotes", (table) => {
    table.string("id").primary();
    table.string("userId").notNullable().references("id").inTable("users");
    table.string("commentId").notNullable().references("id").inTable("comments");
    table.enum("type", ["UP", "DOWN"]).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("commentVotes");
}
