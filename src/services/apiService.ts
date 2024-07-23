import { Request, Response } from "express";
import { UserSchema } from "src/schemas/apiSchema";
import { z } from "zod";

export const getUserDetails = (req: Request, res: Response): void => {
  const userId = req.params.id;
  // Normally, you would fetch user details from a database or another source.
  const userDetails = `User details for user with id ${userId}`;
  res.send(userDetails);
};

export const submitContent = (req: Request, res: Response): Response => {
  /*  #swagger.parameters['body'] = {
            in: 'body',
            type: 'number',
            description: 'Some description...',
            schema: {
                $userId: '4325232',
                $content: 'fdsgfdbsjgbsjh',
                about: 'dwaf'
            }
    } */

  //   const { userId, content } = req.body;

  //   if (!userId || !content) {
  //     return res.status(400).json({ error: "User ID and content are required" });
  //   }

  const validateBody = UserSchema.safeParse(req.body);
  if (!validateBody.success) {
    console.log(validateBody.error.message);
    return res.status(400).json({ error: "User ID and content are required" });
  }
  const { userId, content } = validateBody.data;

  // Simulate a successful submission
  const responseMessage = {
    message: `Content submitted`,
    // content,
  };

  return res.status(200).json(responseMessage);
};
