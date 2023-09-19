import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
 try {
  // const tools = await prisma.tools.findMany()
  return NextResponse.json({ tools: [] })
 } catch (e) {
  console.log(e)
  return NextResponse.json({ e })
 }
}

export async function POST(params: Request) {
 return NextResponse.json({})
}


export async function DELETE(params: Request) {
 return NextResponse.json({})
}

export async function PUT(params: Request) {
 return NextResponse.json({})
}
