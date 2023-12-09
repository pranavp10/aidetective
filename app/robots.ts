import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{
            userAgent: '*',
            allow: '/',
            disallow: '/admin/',
        },
        {
            userAgent: '*',
            allow: '/api/og/*'
        }
        ],
        sitemap: 'https://www.aidetective.xyz/sitemap.xml',
    }
}
