import { z } from "zod";

export const UserSchema = z.object({
  userId: z.string(), // .uuid(),
  content: z.string().min(1),
});

export const UserResponseSchema = z.object({
  message: z.string(),
  content: z.string(),
});
