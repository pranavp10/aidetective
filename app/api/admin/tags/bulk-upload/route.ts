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
        const body = await request.json() as { tagList: string[] }
        const newTagsList = body.tagList.map((tag) => {
            return { slug: slugger.slug(tag), name: tag }
        })
        const tags = await prisma.tags.createMany({
            data: newTagsList
        })
        return new NextResponse(JSON.stringify(tags), { status: 201 })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}
