import { prisma } from '@/lib/prisma'
import { slugger } from '@/lib/slugger';
import { toolsSchema } from '@/schema/tools.schema';
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
        const featuredAt = requestTool.featuredAt
        const pricing = requestTool.pricing
        const appStoreURL = requestTool.appStoreURL
        const playStoreURL = requestTool.playStoreURL
        const possibleUseCase = requestTool.possibleUseCase
        const imageURLs = requestTool.imageURLs
        const tags = requestTool.tags
        const slug = slugger.slug(name)
        const isToolPublished = requestTool.isToolPublished

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
                    featuredAt: featuredAt ? new Date(featuredAt).toISOString() : undefined,
                    pricing,
                    userId: session.user.id,
                    isToolPublished,
                    tags: { connect: tags.map((tagId) => ({ tagId })) },
                }
            }
        )
        await prisma.possibleUseCase.createMany({
            data: possibleUseCase.map((description) => ({ toolId: insertedTool.toolId, description: description }))
        })
        await prisma.imageURLs.createMany({
            data: imageURLs.map((description) => ({ toolId: insertedTool.toolId, imageURL: description }))
        })
        const toolDetails = await prisma.tools.findUnique({
            where: {
                toolId: insertedTool.toolId
            },
            include: {
                tags: true,
                possibleUseCase: true,
                imageURLs: true,
                user: true
            }
        })
        return new NextResponse(JSON.stringify(toolDetails), { status: 201 })
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}

export async function GET() {
    try {
        const tags = await prisma.tools.findMany({
            select: {
                _count: true,
                appStoreURL: true,
                createdAt: true,
                description: true,
                featuredAt: true,
                isToolPublished: true,
                name: true,
                playStoreURL: true,
                pricing: true,
                slug: true,
                summary: true,
                tags: true,
                toolId: true,
                updatedAt: true,
                user: true,
                userId: true,
                imageURLs: true,
                possibleUseCase: true,
                websiteURL: true
            }
        })
        return NextResponse.json(tags)
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}

