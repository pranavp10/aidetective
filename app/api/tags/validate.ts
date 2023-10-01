import { SafeParseReturnType } from "zod";
import { TagSchema } from '@/schema/tags.schema';
import { NextResponse } from "next/server";

export const validateTags = (result: SafeParseReturnType<TagSchema, TagSchema>) => {
    let zodErrors = {};
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
        });
        return new NextResponse(JSON.stringify({ error: zodErrors }), { status: 400 })
    }
}
