import React from "react";
import { prisma } from "@/lib/prisma";
import { ToolCard } from "@/components/toolCard/toolCard";

const getDetails = async ({ slug }: { slug: string }) => {
  try {
    const tool = await prisma.tools.findMany({
      where: {
        tags: {
          every: {
            slug,
          },
        },
      },
      include: {
        tags: true,
      },
    });
    return tool;
  } catch (e) {
    return null;
  }
};

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const tools = await getDetails({ slug });

  if (tools) {
    return (
      <div className="container px-4 py-3 md:px-8 mx-auto mt-10">
        <div className="grid grid-cols-4 gap-4">
          {tools.map((tool) => (
            <ToolCard tool={tool} key={tool.toolId} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container px-4 py-3 md:px-8 mx-auto mt-10">
        No tools found based on tags
      </div>
    );
  }
};

export default Page;
