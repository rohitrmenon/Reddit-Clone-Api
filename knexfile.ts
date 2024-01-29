import { Knex } from 'knex';
import { appConfig } from './src/config/app.config';

const config: Knex.Config = {
  client: "pg" ,
  connection: {
    database: appConfig.postgresDatabase || "postgres",
    user: appConfig.postgresUsername || "postgres",
    password: appConfig.postgresPassword || "",
    host: appConfig.postgresHost || "localhost",
    port: appConfig.postgresPort as number || 5432,
    ssl: appConfig.postgresEnableSsl ? { rejectUnauthorized: false } : false,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/db/migrations",
    extension: "ts",
  },
  seeds: {
    directory: "./src/db/seeds",
    extension: "ts",
  },
};

export default config;
