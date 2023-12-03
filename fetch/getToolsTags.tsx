import { prisma } from "@/lib/prisma";

export const getTags = async (): Promise<Tag[] | undefined> => {
  try {
    const tags = await prisma.tags.findMany();
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
    const tools = await prisma.tools.findMany({
      where: {
        tags: {
          every: {
            slug,
          },
        },
      },
      include: { tags: true },
    });
    return tools;
  } catch (e) {
    return undefined;
  }
};
