import cloudinary from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma'
import { setToolsOccurrences, slugger } from '@/lib/slugger';
import { bulkUploadToolSchema, BulkUploadToolsSchema } from '@/schema/tools.schema';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import { mkdir, rm, writeFile, } from 'fs/promises';
import path from 'path';

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
        const allToolsCreated: { success: boolean, tool?: Omit<Tool, 'tags'> }[] = []
        allTools.forEach(async (tool) => {
            const toolCreated = await addTool(tool, session.user.id)
            allToolsCreated.push(toolCreated)
        })

        return new NextResponse(JSON.stringify(allToolsCreated), { status: 201 })
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), { status: 500 })
    }
}


async function addTool(tool: BulkUploadToolsSchema[0], userId: string): Promise<{ success: boolean, tool?: Omit<Tool, 'tags'> }> {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const tempDir = path.join(process.cwd(), 'temp');
            await mkdir(tempDir, { recursive: true });
            const screenshotPath = path.join(tempDir, 'screenshot.png');

            try {
                const createdTool = await prisma.tools.create({
                    data: {
                        name: tool.name,
                        description: tool.description,
                        slug: slugger.slug(tool.name),
                        summary: tool.summary || '-',
                        websiteURL: tool.websiteURL,
                        appStoreURL: tool.appStoreURL,
                        playStoreURL: tool.playStoreURL,
                        featuredAt: undefined,
                        pricing: tool.pricing,
                        userId: userId,
                        isToolPublished: false,
                        tags: { connect: tool.tags.map((tagId) => ({ tagId })) },
                        imageURL: '-',
                        possibleUseCase: tool.possibleUseCase,
                    }
                })

                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(tool.websiteURL);

                const screenShortData = await page.screenshot();
                const buffer = Buffer.from(screenShortData)
                await writeFile(screenshotPath, buffer)
                const response = await cloudinary.uploader.upload(screenshotPath, {
                    folder: 'superflex/tools',
                    public_id: createdTool.toolId
                })
                await prisma.tools.update({
                    where: { toolId: createdTool.toolId },
                    data: { imageURL: response.url }
                })
                await rm(screenshotPath)
                await browser.close();
                resolve({ success: true, tool: createdTool });
            } catch (e) {
                console.log(e)
                resolve({ success: false, });
                await rm(screenshotPath)
            }
        }, 1);
    });
}
