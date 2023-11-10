import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/ratelimit'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
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

      const session = await getServerSession(authOptions);
      if (session?.user.role !== 'USER') {
         return new NextResponse(JSON.stringify({ error: 'user unauthorised' }), { status: 403 })
      }

      const tool = await prisma.bookmark.findMany({
         where: {
            userId: session?.user.id
         },
         include: {
            tools: {
               include: {
                  tags: true,
               }
            },
            user: true
         }
      })
      return NextResponse.json(tool)
   } catch (error) {
      return new NextResponse(JSON.stringify({ error }), { status: 500 })
   }
}
