import { z } from "zod";

export const tag = z
   .object({
      name: z.string(),
      emoji: z.string()
   })

export type TagSchema = z.infer<typeof tag>;
