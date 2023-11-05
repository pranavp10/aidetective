import { NextRequest, NextResponse } from "next/server"
import { ratelimit } from "@/lib/ratelimit"



export async function POST(request: NextRequest) {
   try {
      const data = await request.json()

      const ip = request.headers.get("x-forwarded-for") ?? ""
      const { success, remaining, limit, reset } = await ratelimit.limit(ip)

      if (!success) {
         const headers = {
            "Retry-After": reset.toString(),
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
         };
         return new NextResponse("You can only send a request once per hour.", {
            status: 429,
            headers
         })
      }

      return new NextResponse("Your data: " + JSON.stringify(data), {
         status: 200,
      })
   } catch (err: any) {
      console.log(err.message)
   }
}
