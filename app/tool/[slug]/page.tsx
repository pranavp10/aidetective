"use client";
import React from "react";
import { prisma } from "@/lib/prisma";
import { ToolDetails } from "./component/toolDetails";
import { Heading } from "@medusajs/ui";
import { ToolCard } from "@/components/toolCard/toolCard";

const getDetails = async ({ slug }: { slug: string }) => {
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
            },
          },
        },
      },
    });
    return tool;
  } catch (e) {
    return null;
  }
};

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const toolDetails = await getDetails({ slug });
  if (toolDetails) {
    return (
      <div className="container px-4 py-3 md:px-8 mx-auto mt-10">
        <ToolDetails tool={toolDetails} />
        <Heading>Related tools</Heading>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {toolDetails.tags.map(({ tools }) => (
              <>
                {tools.map((tool: Tool) => (
                  <ToolCard tool={tool} key={tool.toolId} />
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container px-4 py-3 md:px-8 mx-auto mt-10">
        Page not found
      </div>
    );
  }
};

export default Page;
