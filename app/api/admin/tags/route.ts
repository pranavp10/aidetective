import { prisma } from '@/lib/prisma'
import { slugger } from '@/lib/slugger';
import { tag } from '@/schema/tags.schema';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
   try {
      const session = await getServerSession(authOptions);
      if ((session?.user.role !== 'SUPER_ADMIN')) {
         return new NextResponse(JSON.stringify({ error: 'user unauthorised' }), { status: 403 })
      }
      const body: unknown = await request.json();
      const result = tag.safeParse(body);
      if (!result.success) {
         let zodErrors = {};
         result.error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
         });
         return new NextResponse(JSON.stringify({ error: zodErrors }), { status: 400 })
      }
      const name = result.data.name
      const slug = slugger.slug(name)
      const tags = await prisma.tags.create(
         {
            data: {
               name,
               slug
            }
         }
      )
      return new NextResponse(JSON.stringify(tags), { status: 201 })
   } catch (error) {
      return new NextResponse(JSON.stringify({ error }), { status: 500 })
   }
}

export async function GET(request: Request) {
   try {
      const tags = await prisma.tags.findMany()
      return NextResponse.json(tags)
   } catch (error) {
      return new NextResponse(JSON.stringify({ error }), { status: 500 })
   }
}
