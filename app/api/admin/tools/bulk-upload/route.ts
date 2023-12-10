import { prisma } from '@/lib/prisma'
import { setToolsOccurrences, slugger } from '@/lib/slugger';
import { bulkUploadToolSchema } from '@/schema/tools.schema';
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
        const result = bulkUploadToolSchema.safeParse(body);
        if (!result.success) {
            let zodErrors = {};
            result.error.issues.forEach((issue) => {
                zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
            });
            return new NextResponse(JSON.stringify({ error: zodErrors }), { status: 400 })
        }
        await setToolsOccurrences()
        const allTools = result.data
        const tools = allTools.map((tool) => ({
            name: tool.name,
            description: tool.description,
            slug: slugger.slug(tool.name),
            summary: tool.summary || '-',
            websiteURL: tool.websiteURL,
            appStoreURL: tool.appStoreURL,
            playStoreURL: tool.playStoreURL,
            featuredAt: undefined,
            pricing: tool.pricing,
            userId: session.user.id,
            isToolPublished: false,
            tags: { connect: tool.tags.map((tagId) => ({ tagId })) },
            imageURL: '-',
            possibleUseCase: tool.possibleUseCase,
        }))
        await prisma.tools.createMany({
            data: [...tools]
        })
        return new NextResponse(JSON.stringify([]), { status: 201 })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}
