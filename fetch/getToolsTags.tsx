import { prisma } from "@/lib/prisma";

export const getTags = async (): Promise<Tag[] | undefined> => {
  try {
    const allTags = await prisma.tags.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        tools: true,
      },
    });
    const tags = allTags.filter((tags) => !!tags.tools.length);
    return tags;
  } catch (e) {
    throw "Something when wrong";
  }
};

export const getToolsTags = async (): Promise<Tool[] | undefined> => {
  try {
    const tools = await prisma.tools.findMany({
      include: { tags: true },
      where: {
        isToolPublished: true,
      },
    });
    return tools;
  } catch (e) {
    return undefined;
  }
};

export const getToolsByTagSlug = async ({
  slug,
}: {
  slug: string;
}): Promise<Tool[] | undefined> => {
  try {
    const tag = await prisma.tags.findUnique({
      where: {
        slug,
      },
      include: {
        tools: {
          where: {
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
};
