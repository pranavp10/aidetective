import { prisma } from '@/lib/prisma';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'
import { writeFile, rm, } from 'fs/promises';

export const POST = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const session = await getServerSession(authOptions);
        if ((session?.user.role !== 'SUPER_ADMIN')) {
            return new NextResponse(JSON.stringify({ error: 'user unauthorised' }), { status: 403 })
        }
        const data = await request.formData()
        const file: File | null = data.get('file') as unknown as File

        if (!file) {
            return NextResponse.json({ success: false })
        }
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const path = `/tmp/${file.name}`
        await writeFile(path, buffer)
        const response = await cloudinary.uploader.upload(path, {
            folder: 'superflex/tools',
            public_id: params.id
        })
        await prisma.tools.update({
            where: { toolId: params.id },
            data: { imageURL: response.url }
        })
        await rm(path)
        return NextResponse.json(response)
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}
