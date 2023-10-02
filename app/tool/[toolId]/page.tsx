import React from "react";
import { prisma } from "@/lib/prisma";
import { ToolDetails } from "./component/toolDetails";

const getDetails = async ({ toolId }: { toolId: string }) => {
  try {
    const tool = await prisma.tools.findUnique({
      where: {
        toolId: toolId,
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

const Page = async ({ params: { toolId } }: { params: { toolId: string } }) => {
  const tool = await getDetails({ toolId });
  if (tool) {
    return (
      <div className="container px-4 py-3 md:px-8 mx-auto mt-10">
        <ToolDetails tool={tool} />
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
