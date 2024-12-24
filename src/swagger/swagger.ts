import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../../swagger.json";
import { Express } from "express";
import path from "path";

// Setup Swagger UI
const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;
