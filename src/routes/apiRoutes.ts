import { Router, Express } from "express";
import { getUserDetails, submitContent } from "src/services/apiService";

const apiRouter = Router();

apiRouter.get("/:id", getUserDetails);

apiRouter.post("/submit-content", submitContent);

export default apiRouter;
