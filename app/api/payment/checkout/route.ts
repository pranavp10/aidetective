import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/ratelimit'
import { authOptions } from '@/utils/authOptions'
import { getAdminStrip } from '@/utils/stripe'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const headers = await checkRateLimit(request.headers.get("x-forwarded-for") ?? "")
        if (headers) {
            return new NextResponse("You can only send a request once per hour.", {
                status: 429,
                headers
            })
        }

        const session = await getServerSession(authOptions);
        if (!session?.user.id || !(['USER', 'SUPER_ADMIN'].includes(session?.user.role || ""))) {
            return new NextResponse(JSON.stringify({ error: 'user unauthorised' }), { status: 403 })
        }
        const body: { toolId: string } = await request.json();
        const toolId = body.toolId
        if (!toolId) return new NextResponse("Send a valid toolId", {
            status: 403,
            headers
        })
        const doesToolExist = await prisma.tools.findUnique({
            where: {
                toolId: toolId,
                userId: session.user.id,
                isToolPublished: true,
                isFeatured: false
            }
        })
        if (!doesToolExist) return new NextResponse("Send a valid toolId", {
            status: 403,
            headers
        })
        const stripeSession = await getAdminStrip().checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [{
                price: pricing,
                quantity: 1,
            }],
            customer_email: session.user.email || undefined,
            metadata: { toolId, userId: session.user.id },
            mode: 'subscription',
            success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true&toolId=${toolId}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/dashboard`,
        })
        return NextResponse.json({ redirect: stripeSession.url })
    } catch (error) {
        console.log("🚀 ~ file: route.ts:53 ~ POST ~ error:", error)
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}

const pricing = 'price_1ORYSoSJpdfX9K3xG4sJf6XZ'
