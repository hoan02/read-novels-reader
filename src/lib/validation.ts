import { z } from "zod";

export const novelCreateSchema = z.object({
  novelName: z.string().min(2).max(150),
  author: z.string().min(2).max(50),
  genres: z.array(z.string()),
  description: z.string().min(2).max(500).trim(),
  urlCover: z.string().url(),
});

export const novelUpdateSchema = novelCreateSchema.merge(
  z.object({
    novelId: z.string(),
  })
);
