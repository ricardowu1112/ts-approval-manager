import { Request, Response } from "express";

export const getUserDetails = (req: Request, res: Response): void => {
  const userId = req.params.id;
  // Normally, you would fetch user details from a database or another source.
  const userDetails = `User details for user with id ${userId}`;
  res.send(userDetails);
};

export const submitContent = (req: Request, res: Response): Response => {
  const userId = req.params.id;
  // Normally, you would fetch user details from a database or another source.
  const userDetails = { message: `User details for user with id ${userId}` };
  return res.status(400).json(userDetails);
};
