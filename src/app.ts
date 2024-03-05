import express, {
  json,
  urlencoded,
  Response as ExResponse,
  Request as ExRequest,
} from "express";
import { Model } from "objection";
import Knex from "knex";
import swaggerUi from "swagger-ui-express";
// @ts-ignore
import { RegisterRoutes } from "../build/routes";
import { appConfig } from "./config/app.config";
import config from "../knexfile";
import cors from "cors";

const knexInstance = Knex(config);

Model.knex(knexInstance);

export const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "*",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(
  urlencoded({
    extended: false,
  })
);
app.use(json());
app.use(
  appConfig.swagger.path,
  swaggerUi.serve,
  async (_req: ExRequest, res: ExResponse) => {
    return res.send(
      // @ts-ignore
      swaggerUi.generateHTML(await import("../build/swagger.json"))
    );
  }
);

RegisterRoutes(app);
