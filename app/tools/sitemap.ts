import { prisma } from '@/lib/prisma'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const WEBSITE_URL = 'https://www.aidetective.xyz'
    try {
        const slugs = await prisma.tools.findMany({ select: { slug: true }, where: { isToolPublished: true } })
        const toolsUrls: SitemapFile[] = slugs.map(({ slug }: { slug: string }) => ({
            url: `${WEBSITE_URL}/tool/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        }))

        return [...toolsUrls]
    }
    catch (e) {
        return []
    }
}


interface SitemapFile {
    url: string;
    lastModified?: string | Date | undefined;
    changeFrequency?: "monthly" | "yearly" | "weekly" | "always" | "hourly" | "daily" | "never" | undefined;
    priority?: number | undefined;
}


