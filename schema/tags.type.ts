import { z } from "zod";

export const tag = z
   .object({
      name: z.string(),
   })

export type TagSchema = z.infer<typeof tag>;
