"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiService_1 = require("src/services/apiService");
const apiRouter = (0, express_1.Router)();
apiRouter.post("/submit-content", apiService_1.submitContent);
apiRouter.get("/pg", apiService_1.getPGContent);
exports.default = apiRouter;
