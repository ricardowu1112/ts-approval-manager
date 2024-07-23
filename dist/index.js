"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./utils/logger"));
const routes_1 = __importDefault(require("./routes"));
const morganMiddleware_1 = __importDefault(require("@middleware/morganMiddleware"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = __importDefault(require("fs"));
require("./dotenv"); // 这会加载环境变量
const path_1 = __importDefault(require("path"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
// dotenv.config({ path: path.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.use(express_1.default.json());
app.use(morganMiddleware_1.default);
app.use(express_1.default.static("public"));
app.use(routes_1.default);
const swaggerDocument = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "./swagger-output.json"), "utf8"));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use("/api", apiRoutes_1.default);
// app.get("/logger", (req: express.Request, res: express.Response) => {
//   Logger.error("This is an error log");
//   Logger.warn("This is a warn log");
//   Logger.info("This is a info log");
//   Logger.http("This is a http log");
//   Logger.debug("This is a debug log");
//   res.send("Hello world");
// });
app.use((err, req, res, next) => {
    logger_1.default.error("This is an error log");
    res.status(500).send("Something broke!");
});
app.listen(port, () => {
    console.log(`Example app url: http://localhost:${port}`);
});
