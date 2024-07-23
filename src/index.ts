import express, { Application } from "express";
import Logger from "./lib/logger";
import { testMiddleware } from "@middleware/testMiddleware";
import Router from "./routes";
import morganMiddleware from "@middleware/morganMiddleware";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

import dotenv from "dotenv";
import path from "path";
import apiRouter from "./routes/apiRoutes";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app: Application = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());
app.use(morganMiddleware);
app.use(express.static("public"));

app.use(Router);

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../swagger-output.json"), "utf8")
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", apiRouter);

// app.get("/logger", (req: express.Request, res: express.Response) => {
//   Logger.error("This is an error log");
//   Logger.warn("This is a warn log");
//   Logger.info("This is a info log");
//   Logger.http("This is a http log");
//   Logger.debug("This is a debug log");

//   res.send("Hello world");
// });

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    Logger.error("This is an error log");
    res.status(500).send("Something broke!");
  }
);

app.listen(port, () => {
  console.log(`Example app url: http://localhost:${port}`);
});
