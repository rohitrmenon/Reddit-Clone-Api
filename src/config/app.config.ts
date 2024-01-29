import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000; 

export const appConfig = {
  port, 
  swagger: {
    enabled: process.env.SWAGGER_ENABLED === "true", 
    path: "/docs",
  },
  postgresDatabase: process.env.POSTGRES_DATABASE || "postgres",
  postgresPort: process.env.POSTGRES_PORT || 5432 ,
  postgresHost: process.env.POSTGRES_HOST || "localhost",
  postgresUsername: process.env.POSTGRES_USERNAME || "postgres",
  postgresPassword: process.env.POSTGRES_PASSWORD , 
  postgresEnableSsl: process.env.POSTGRES_ENABLE_SSL === "true",
};
