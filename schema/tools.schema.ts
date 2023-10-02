
import { z } from "zod";
import { Pricing } from "@prisma/client";

export const toolsSchema = z
    .object({
        name: z.string().nonempty(),
        summary: z.string().nonempty(),
        description: z.string().nonempty(),
        websiteURL: z.string().url('Invalid URL').nonempty(),
        featuredAt: z.string().optional(),
        pricing: z.enum([
            Pricing.free,
            Pricing.free_trail,
            Pricing.free_trail_no_card,
            Pricing.paid,
        ]),
        appStoreURL: z.string().optional(),
        playStoreURL: z.string().optional(),
        possibleUseCase: z.string().array().min(1, 'At least one use case is required'),
        imageURLs: z.string().array().min(1, 'At least one image url is required'),
        tags: z.string().array().min(1, 'At least one tags is required'),
        isToolPublished: z.boolean()
    })

export type ToolsSchema = z.infer<typeof toolsSchema>;
