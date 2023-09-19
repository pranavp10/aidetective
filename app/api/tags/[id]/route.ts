import { prisma } from '@/lib/prisma'
import { slugger } from '@/lib/slugger'
import { tag } from '@/schema/tags.type'
import { NextResponse } from 'next/server'

const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const id = params.id
    try {
        const tag = await prisma.tags.findUnique({
            where: {
                tagId: id
            }
        })
        return NextResponse.json(tag)
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}

const PUT = async (request: Request, { params }: { params: { id: string } }) => {
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

    const id = params.id
    try {
        const tag = await prisma.tags.update({
            where: {
                tagId: id
            },
            data: { slug, name }
        })
        return NextResponse.json(tag)
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}

const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const id = params.id
    try {
        const tag = await prisma.tags.delete({
            where: {
                tagId: id
            }
        })
        return NextResponse.json(tag)
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}

export { GET, PUT, DELETE }
