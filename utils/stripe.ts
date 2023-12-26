import { loadStripe, Stripe as StripeType } from '@stripe/stripe-js';
import Stripe from 'stripe';

let stripePromise: Promise<StripeType | null>;

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ??
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
            ''
        );
    }

    return stripePromise;
};



export const getAdminStrip = () => {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY is missing. Please set the environment variable.');
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2023-10-16",
    });
    return stripe
}
