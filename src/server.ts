import { app } from "./app";
import { appConfig } from "./config/app.config";
import logger from "./helpers/logger";

const port = appConfig.port as number;

app.listen(port, () =>
  logger.info(`service listening at http://localhost:${port}`)
);