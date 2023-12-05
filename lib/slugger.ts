import GithubSlugger from 'github-slugger'
import { prisma } from './prisma';

export const slugger = new GithubSlugger()

export const setToolsOccurrences = async () => {
    try {
        const slug = await prisma.tools.findMany({
            select: {
                slug: true
            }
        })
        const occurrences: Record<string, number> = {};
        slug.forEach(({ slug }: { slug: string }) => {
            const key = slug.replace(/-\d+$/, '');
            occurrences[key] = (occurrences[key] || 0) + 1;

        });
        slugger.occurrences = occurrences
    } catch (e) {
        console.log(e)
    }
}
