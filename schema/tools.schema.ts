
import { z } from "zod";
import { Pricing } from "@prisma/client";

export const toolsSchema = z
    .object({
        name: z.string().nonempty(),
        summary: z.string().optional(),
        description: z.string().nonempty(),
        websiteURL: z.string().url('Invalid URL').nonempty(),
        featuredAt: z.string().optional(),
        pricing: z.enum([
            Pricing.free,
            Pricing.free_trail,
            Pricing.free_trail_no_card,
            Pricing.paid,
            Pricing.one_time_payment,
            Pricing.waitlist,
            Pricing.yearly_subscription,
            Pricing.request_demo,
            Pricing.freemium,
        ]),
        appStoreURL: z.string().optional(),
        playStoreURL: z.string().optional(),
        slug: z.string().optional(),
        possibleUseCase: z.string().nonempty(),
        imageURL: z.any(),
        tags: z.string().array().min(1, 'At least one tags is required'),
        isToolPublished: z.boolean(),
        isFeatured: z.boolean()
    })

export type ToolsSchema = z.infer<typeof toolsSchema>;


export const bulkUploadToolSchema = z.object({
    name: z.string().nonempty(),
    summary: z.string().optional(),
    description: z.string().nonempty(),
    websiteURL: z.string().url('Invalid URL').nonempty(),
    pricing: z.enum([
        Pricing.free,
        Pricing.free_trail,
        Pricing.free_trail_no_card,
        Pricing.paid,
        Pricing.one_time_payment,
        Pricing.waitlist,
        Pricing.yearly_subscription,
        Pricing.request_demo,
        Pricing.freemium,
    ]),
    appStoreURL: z.string().optional(),
    playStoreURL: z.string().optional(),
    possibleUseCase: z.string().nonempty(),
    tags: z.string().array().min(1, 'At least one tags is required'),
}).array()

export type BulkUploadToolsSchema = z.infer<typeof bulkUploadToolSchema>;
