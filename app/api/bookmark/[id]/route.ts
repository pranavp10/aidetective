import { prisma } from '@/lib/prisma'
import { checkRateLimit } from '@/lib/ratelimit'
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export const POST = async (request: Request, { params }: { params: { toolId: string } }) => {
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

        const toolId = params?.toolId
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


const DELETE = async (request: Request, { params }: { params: { bookmarkId: string } }) => {
    const bookmarkId = params.bookmarkId
    const headers = await checkRateLimit(request.headers.get("x-forwarded-for") ?? "")
    if (headers) new NextResponse("You can only send a request once per hour.", {
        status: 429,
        headers
    })
    if (!bookmarkId) return new NextResponse(JSON.stringify({ error: 'Please send valid tagId' }), { status: 403 })
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'USER') new NextResponse(JSON.stringify({ error: 'user unauthorised' }), { status: 403 })

    try {
        await prisma.bookmark.delete({
            where: {
                bookmarkId,
                userId: session?.user.id
            }
        })
        return NextResponse.json({ success: true, message: 'Remove tool removed from bookmark' })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}

export { DELETE }
