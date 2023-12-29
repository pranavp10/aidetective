import { prisma } from "@/lib/prisma"
import { openai, pinecone } from "@/utils/chromadb";
import { NextResponse } from "next/server"


export async function GET(request: Request) {
    try {
        const embeddings = await openai.embeddings.create({ input: 'generate ai image', model: 'text-embedding-ada-002' })
        const vector = embeddings.data[0].embedding
        const collection = await pinecone.index('tools').query({ vector, topK: 3 })
        const toolIds = collection.matches.map(value => value.id)
        const tools = await prisma.tools.findMany({
            where: { toolId: { in: toolIds } },
            include: { tags: true }
        })
        return NextResponse.json({ success: true, tools })
    } catch (error) {
        console.log("🚀 ~ file: route.ts:20 ~ GET ~ error:", error)
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}
