import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/ratelimit'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
   try {
      const headers = await checkRateLimit(request.headers.get("x-forwarded-for") ?? "")
      if (headers) {
         return new NextResponse("You can only send a request once per hour.", {
            status: 429,
            headers
         })
      }
      const tags = await prisma.tags.findMany()
      return NextResponse.json(tags)
   } catch (error) {
      return new NextResponse(JSON.stringify({ error }), { status: 500 })
   }
}
