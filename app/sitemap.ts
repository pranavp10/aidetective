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

    return [...defaultSlugs,]
}


interface SitemapFile {
    url: string;
    lastModified?: string | Date | undefined;
    changeFrequency?: "monthly" | "yearly" | "weekly" | "always" | "hourly" | "daily" | "never" | undefined;
    priority?: number | undefined;
}


