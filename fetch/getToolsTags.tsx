import { mappedTags } from "@/data/tags";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getTags = cache(async (): Promise<Tag[] | undefined> => {
  try {
    const allTags = await prisma.tags.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        tools: {
          where: { isToolPublished: true },
        },
      },
    });
    const tags = allTags.filter((tags) => !!tags.tools.length);
    return tags;
  } catch (e) {
    throw "Something when wrong";
  }
});

export const getToolsTags = cache(async (): Promise<Tool[] | undefined> => {
  try {
    const tools = await prisma.tools.findMany({
      include: { tags: true },
      orderBy: {
        name: "asc",
      },
      where: {
        isToolPublished: true,
      },
    });
    return tools;
  } catch (e) {
    return undefined;
  }
});

export const getToolsByTagSlug = cache(
  async ({ slug }: { slug: string }): Promise<Tool[] | undefined> => {
    const relatedTags = mappedTags.find((mappedTag) => mappedTag.slug === slug);

    try {
      const tag = await prisma.tags.findUnique({
        where: {
          slug,
        },
        include: {
          tools: {
            where: {
              tags: {
                some: {
                  slug: {
                    in: relatedTags?.map,
                  },
                },
              },
              isToolPublished: true,
            },
            include: {
              tags: true,
            },
          },
        },
      });
      return tag?.tools;
    } catch (e) {
      return undefined;
    }
  }
);

export const getTagBySlug = cache(
  async ({ slug }: { slug: string }): Promise<Tag | undefined> => {
    try {
      const tag = await prisma.tags.findUnique({
        where: {
          slug,
        },
      });
      return tag ? tag : undefined;
    } catch (e) {
      return undefined;
    }
  }
);

export const getToolsDetails = cache(async ({ slug }: { slug: string }) => {
  try {
    const tool = await prisma.tools.findUnique({
      where: {
        slug,
      },
      include: {
        tags: {
          include: {
            tools: {
              include: {
                tags: true,
              },
              // Added below to show published and distinct
              where: {
                isToolPublished: true,
              },
              distinct: ["toolId"],
            },
          },
        },
      },
    });
    return tool;
  } catch (e) {
    return null;
  }
});
