import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/ratelimit'
import { toolsSchema } from '@/schema/tools.schema'
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
      if (!session?.user.id || !(['USER', 'SUPER_ADMIN'].includes(session?.user.role || ""))) {
         return new NextResponse(JSON.stringify({ error: 'user unauthorised' }), { status: 403 })
      }

      const tool = await prisma.tools.findMany({
         where: {
            userId: session?.user.id
         },
         include: {
            tags: true,
            user: true

         }
      })
      return NextResponse.json(tool)
   } catch (error) {
      return new NextResponse(JSON.stringify({ error }), { status: 500 })
   }
}


export const POST = async (request: Request) => {
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
      const tool = await prisma.tools.findMany({
         where: {
            userId: session?.user.id
         }
      })
      if (tool.length) {
         return new NextResponse(JSON.stringify({ error: 'Cannot Submit more then 1 tool' }), { status: 403 })
      }

      const body: unknown = await request.json();
      const result = toolsSchema.safeParse(body);
      if (!result.success) {
         let zodErrors = {};
         result.error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
         });
         return new NextResponse(JSON.stringify({ error: zodErrors }), { status: 400 })
      }
      const requestTool = result.data
      const name = requestTool.name
      const summary = requestTool.summary
      const description = requestTool.description
      const websiteURL = requestTool.websiteURL
      const pricing = requestTool.pricing
      const appStoreURL = requestTool.appStoreURL
      const playStoreURL = requestTool.playStoreURL
      const possibleUseCase = requestTool.possibleUseCase
      const imageURL = requestTool.imageURL
      const tags = requestTool.tags
      const slug = requestTool.slug

      const insertedTool = await prisma.tools.create(
         {
            data: {
               name,
               slug,
               description,
               summary,
               websiteURL,
               appStoreURL,
               playStoreURL,
               featuredAt: new Date().toISOString(),
               pricing,
               userId: session.user.id,
               isToolPublished: false,
               tags: { connect: tags.map((tagId) => ({ tagId })) },
               imageURL,
               possibleUseCase,
            }
         }
      )
      const toolDetails = await prisma.tools.findUnique({
         where: {
            toolId: insertedTool.toolId
         },
         include: {
            tags: true,
            user: true
         }
      })
      return new NextResponse(JSON.stringify(toolDetails), { status: 201 })
   } catch (error) {
      console.log(error)
      return new NextResponse(JSON.stringify({ error }), { status: 500 })
   }
}
