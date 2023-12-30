import { prisma } from '@/lib/prisma'
import { slugger } from '@/lib/slugger';
import { toolsSchema } from '@/schema/tools.schema';
import { authOptions } from '@/utils/authOptions';
import { openai, pinecone } from '@/utils/chromadb';
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
        const summary = requestTool.summary || '-'
        const description = requestTool.description
        const websiteURL = requestTool.websiteURL
        const featuredAt = requestTool.featuredAt
        const pricing = requestTool.pricing
        const appStoreURL = requestTool.appStoreURL
        const playStoreURL = requestTool.playStoreURL
        const possibleUseCase = requestTool.possibleUseCase
        const imageURL = requestTool.imageURL
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
        const documents = `${name} ${description} ${summary} ${possibleUseCase} ${pricing} ${slug}`
        const embeddings = await openai.embeddings.create({ input: documents, model: 'text-embedding-ada-002' })
        const insertData = embeddings.data.map((vector, index) => ({ id: insertedTool.toolId, values: vector.embedding }))
        await pinecone.Index("tools").upsert(insertData);
        return new NextResponse(JSON.stringify(toolDetails), { status: 201 })
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if ((session?.user.role !== 'SUPER_ADMIN')) {
        return new NextResponse(JSON.stringify({ error: 'user unauthorised' }), { status: 403 })
    }
    try {
        const tools = await prisma.tools.findMany({
            include: {
                user: true,
                tags: true
            }
        })
        return NextResponse.json(tools)
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}

