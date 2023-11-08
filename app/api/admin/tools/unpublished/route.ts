import { prisma } from '@/lib/prisma'
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'


export async function GET() {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'SUPER_ADMIN') {
        return new NextResponse(JSON.stringify({ error: 'user unauthorised' }), { status: 403 })
    }
    try {
        const tools = await prisma.tools.findMany({
            include: {
                user: true,
                tags: true
            },
            where: {
                isToolPublished: false
            }
        })
        return NextResponse.json(tools)
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}

