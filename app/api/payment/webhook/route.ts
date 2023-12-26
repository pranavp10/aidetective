import { prisma } from '@/lib/prisma'
import { getAdminStrip, } from '@/utils/stripe'
import { NextRequest } from 'next/server'
import Stripe from 'stripe'
import { headers } from "next/headers";


export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = headers().get("stripe-signature")!;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    try {
        const event = getAdminStrip().webhooks.constructEvent(body, signature, endpointSecret);
        if (event.type === 'checkout.session.completed') {
            const checkoutSessionCompleted = event.data.object;
            const metadata = checkoutSessionCompleted.metadata as { toolId: string, userId: string }
            prisma.tools.update({
                where: {
                    toolId: metadata.toolId,
                    userId: metadata.userId
                },
                data: {
                    isFeatured: true
                }
            })
        }
        return new Response("RESPONSE EXECUTE", {
            status: 200,
        });
    } catch (err) {
        return new Response(`Webhook Error: ${err}`, {
            status: 400,
        });
    }
}
