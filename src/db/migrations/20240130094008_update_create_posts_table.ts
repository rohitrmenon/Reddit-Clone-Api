import { Knex } from "knex";

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.alterTable("posts", function (table) {
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.alterTable("posts", function (table) {
    table.dropColumn("createdAt");
    table.dropColumn("updatedAt");
  });
};
