// "use client";
import React from "react";
import { prisma } from "@/lib/prisma";
import { ToolDetails } from "./component/toolDetails";
import { Heading } from "@medusajs/ui";
import { ToolCardLayout } from "@/components/toolCard/toolCardLayout";

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
      <div>
        {!!toolDetails.name ? <ToolDetails tool={toolDetails} /> : <></>}
        <Heading className="my-6">Related tools</Heading>
        <ToolCardLayout
          tools={toolDetails.tags.map((tag) => tag.tools).flat()}
        />
      </div>
    );
  } else {
    return <div>Page not found</div>;
  }
};

export default Page;
