import express from "express";
import PingController from "../controllers/ping";
import userRouter from "./apiRoutes";

const Router = express.Router();

Router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

export default Router;
