import { prisma } from "@/lib/prisma"
import { authOptions } from "@/utils/authOptions";
import { openai, pinecone } from "@/utils/chromadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"


export async function GET() {
    const session = await getServerSession(authOptions);
    try {
        if ((session?.user.role !== 'SUPER_ADMIN')) {
            return new NextResponse(JSON.stringify({ error: 'user unauthorised' }), { status: 403 })
        }
        const allTools = await prisma.tools.findMany({
            where: { isToolPublished: true },
            orderBy: { createdAt: 'asc' }
        })
        const ids = allTools.map((tool) => tool.toolId)
        const documents = allTools.map((tool) => `${tool.name} ${tool.description} ${tool.summary} ${tool.possibleUseCase} ${tool.pricing} ${tool.slug}`)
        const embeddings = await openai.embeddings.create({ input: documents, model: 'text-embedding-ada-002' })
        const insertData = embeddings.data.map((vector, index) => ({ id: ids[index], values: vector.embedding }))
        const index = await pinecone.Index("tools").upsert(insertData);
        return NextResponse.json({ success: true, index })
    } catch (error) {
        console.log("🚀 ~ file: route.ts:28 ~ GET ~ error:", error)
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}
