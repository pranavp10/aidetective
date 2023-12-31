import cloudinary from '@/lib/cloudinary'
import { prisma } from '@/lib/prisma'
import { toolsSchema } from '@/schema/tools.schema'
import { authOptions } from '@/utils/authOptions'
import { openai, pinecone } from '@/utils/chromadb'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const id = params.id
    try {
        const tool = await prisma.tools.findUnique({
            where: {
                toolId: id
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

const PUT = async (request: Request, { params }: { params: { id: string } }) => {
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
        const imageURL = requestTool.imageURL
        const tags = requestTool.tags
        const slug = requestTool.slug
        const isToolPublished = requestTool.isToolPublished
        const isFeatured = requestTool.isFeatured

        const updatedTool = await prisma.tools.update(
            {
                where: {
                    toolId: params.id,
                },
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
                    isToolPublished,
                    tags: { connect: tags.map((tagId) => ({ tagId })) },
                    imageURL,
                    possibleUseCase,
                    isFeatured
                }
            }
        )
        const updatedToolDetails = await prisma.tools.findUnique({
            where: {
                toolId: updatedTool.toolId
            },
            include: {
                tags: true,
                user: true
            }
        })
        const documents = `${name} ${description} ${summary} ${possibleUseCase} ${pricing} ${slug}`
        const embeddings = await openai.embeddings.create({ input: documents, model: 'text-embedding-ada-002' })
        const insertData = embeddings.data.map((vector, index) => ({ id: updatedTool.toolId, values: vector.embedding }))
        await pinecone.Index("tools").upsert(insertData);

        return NextResponse.json(updatedToolDetails)
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}

const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const session = await getServerSession(authOptions);
    if (!(session?.user.role === 'SUPER_ADMIN')) {
        return new NextResponse(JSON.stringify({ error: 'user unauthorised' }), { status: 403 })
    }
    const toolId = params.id
    try {
        const toolDetails = await prisma.tools.delete({
            where: {
                toolId
            }
        })
        await cloudinary.uploader.destroy(`superflex/tools/${params.id}`)
        return NextResponse.json(toolDetails)
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}

export { GET, PUT, DELETE }
