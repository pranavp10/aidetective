
import { z } from "zod";

export const subscribeSchema = z
    .object({
        email: z.string().email('Enter a valid Email'),
    })

export type SubscribeSchema = z.infer<typeof subscribeSchema>;
