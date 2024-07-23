import { Router, Express } from "express";
import { getUserDetails } from "src/services/apiService";

const apiRouter = Router();

apiRouter.get("/:id", getUserDetails);
apiRouter.post("/submit-content", getUserDetails);

export default apiRouter;
