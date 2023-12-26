import { prisma } from '@/lib/prisma'
import { getAdminStrip, } from '@/utils/stripe'
import { NextRequest } from 'next/server'
import { headers } from "next/headers";
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
    const body = await request.text();
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    const sig = headers().get("stripe-signature") as string;
    let event: Stripe.Event;
    try {
        event = getAdminStrip().webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        return new Response(`Webhook Error: ${err}`, {
            status: 400,
        });
    }
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
}
