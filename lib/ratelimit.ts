import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "1 s"),
})

export const checkRateLimit = async (ip: string) => {
    const { success, remaining, limit, reset } = await ratelimit.limit(ip)
    if (!success) {
        const headers = {
            "Retry-After": reset.toString(),
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
        };
        return headers
    }
}
