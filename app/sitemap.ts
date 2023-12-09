import { prisma } from '@/lib/prisma'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const WEBSITE_URL = 'https://www.aidetective.xyz'

    const defaultSlugs: SitemapFile[] = [
        {
            url: WEBSITE_URL,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${WEBSITE_URL}/login`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
    try {
        const slugs = await prisma.tools.findMany({ select: { slug: true }, where: { isToolPublished: true } })
        const tagsSlug = await prisma.tags.findMany({ select: { slug: true }, })

        const toolsUrls: SitemapFile[] = slugs.map(({ slug }: { slug: string }) => ({
            url: `${WEBSITE_URL}/tool/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        }))
        const tagsUrls: SitemapFile[] = tagsSlug.map(({ slug }: { slug: string }) => ({
            url: `${WEBSITE_URL}/categories/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        }))
        return [...defaultSlugs, ...toolsUrls, ...tagsUrls]
    }
    catch (e) {
        return [...defaultSlugs]
    }
}


interface SitemapFile {
    url: string;
    lastModified?: string | Date | undefined;
    changeFrequency?: "monthly" | "yearly" | "weekly" | "always" | "hourly" | "daily" | "never" | undefined;
    priority?: number | undefined;
}


