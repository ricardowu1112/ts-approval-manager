import express, { Router, Express, Request, Response } from "express";
import { query } from "src/databases/pg";
import { getPGContent, submitContent } from "src/services/apiService";
import { handleError } from "src/utils/errorHandler";

const apiRouter = Router();

apiRouter.post("/submit-content", submitContent);

apiRouter.get("/pg", getPGContent);

export default apiRouter;
