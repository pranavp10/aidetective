import { prisma } from "@/lib/prisma"
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"

export async function GET() {
    const session = await getServerSession(authOptions);

    try {
        if ((session?.user.role !== 'SUPER_ADMIN')) {
            return new NextResponse(JSON.stringify({ error: 'user unauthorised' }), { status: 403 })
        }
        const user = await prisma.user.findMany()
        return NextResponse.json(user)
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}
