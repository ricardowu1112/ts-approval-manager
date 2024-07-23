import { Response } from "express";
import Logger from "./logger";

export const handleError = (
  res: Response,
  err: unknown,
  message: string = "Internal server error"
) => {
  Logger.error("This is an error log");
  return res.status(500).json({ error: message });
};
