import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/ratelimit'
import { subscribeSchema } from '@/schema/subscribe.schema.';
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
    try {
        const headers = await checkRateLimit(request.headers.get("x-forwarded-for") ?? "")
        if (headers) {
            return new NextResponse("You can only send a request once per hour.", {
                status: 429,
                headers
            })
        }
        const body: unknown = await request.json();
        const result = subscribeSchema.safeParse(body);
        if (!result.success) {
            let zodErrors = {};
            result.error.issues.forEach((issue) => {
                zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
            });
            return new NextResponse(JSON.stringify({ error: zodErrors }), { status: 400 })
        }
        const email = result.data.email
        const tags = await prisma.emailSubscribe.create({ data: { emailID: email } })
        return new NextResponse(JSON.stringify(tags), { status: 201 })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}

