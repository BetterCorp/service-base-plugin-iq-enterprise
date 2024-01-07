import { z } from "zod";

export const secSchema = z
  .object({
    username: z.string(),
    password: z.string(),
    host: z.string().default("https://api.example.com"),
  })
  .optional();
