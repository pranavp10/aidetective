"use server";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { cache } from "react";

export const getBookmark = async (): Promise<Tool[] | undefined> => {
  const session = await getServerSession(authOptions);
  try {
    const tool = await prisma.bookmark.findMany({
      where: {
        userId: session?.user.id,
      },
      include: {
        tools: {
          include: {
            tags: true,
          },
        },
      },
    });
    return tool.map((bookmark) => bookmark.tools);
  } catch (e) {
    return undefined;
  }
};

export const getSubmittedTools = cache(
  async (): Promise<Tool[] | undefined> => {
    const session = await getServerSession(authOptions);
    try {
      const tool = await prisma.tools.findMany({
        where: {
          userId: session?.user.id,
        },
        include: {
          tags: true,
        },
      });
      return tool;
    } catch (e) {
      return undefined;
    }
  }
);
