import { Request, Response, NextFunction } from "express";

export const testMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("alias enabled!");

  next();
};
