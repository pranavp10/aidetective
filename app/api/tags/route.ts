import { prisma } from '@/lib/prisma'
import { slugger } from '@/lib/slugger';
import { tag } from '@/schema/tags.type';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
   try {
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
