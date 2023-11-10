import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/ratelimit'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export const POST = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const headers = await checkRateLimit(request.headers.get("x-forwarded-for") ?? "")
        if (headers) {
            return new NextResponse("You can only send a request once per hour.", {
                status: 429,
                headers
            })
        }
        const session = await getServerSession(authOptions);
        if (session?.user.role !== 'USER') {
            return new NextResponse(JSON.stringify({ error: 'user unauthorised' }), { status: 403 })
        }

        const toolId = params?.id
        if (!toolId) {
            return new NextResponse(JSON.stringify({ error: 'Please send toolId' }), { status: 403 })
        }
        const doesToolIdExist = await prisma.tools.findUnique({
            where: {
                toolId
            }
        })

        if (!doesToolIdExist) {
            return new NextResponse(JSON.stringify({ error: 'Please send valid toolId' }), { status: 403 })
        }

        await prisma.bookmark.create({
            data: {
                toolId,
                userId: session.user.id
            }
        })
        return new NextResponse(JSON.stringify({ success: true, message: 'tool bookmarked' }), { status: 201 })
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}


const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    const toolId = params.id
    const headers = await checkRateLimit(request.headers.get("x-forwarded-for") ?? "")
    if (headers) new NextResponse("You can only send a request once per hour.", {
        status: 429,
        headers
    })
    if (!toolId) return new NextResponse(JSON.stringify({ error: 'Please send valid tagId' }), { status: 403 })

    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'USER') new NextResponse(JSON.stringify({ error: 'user unauthorised' }), { status: 403 })

    try {
        await prisma.bookmark.deleteMany({
            where: {
                toolId,
                userId: session?.user.id
            }
        })
        return NextResponse.json({ success: true, message: 'Remove tool removed from bookmark' })
    } catch (error) {
        console.log("🚀 ~ file: route.ts:70 ~ DELETE ~ error:", error)
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}

export { DELETE }
