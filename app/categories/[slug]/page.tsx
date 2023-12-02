import React from "react";
import { getToolsByTagSlug } from "@/fetch/getToolsTags";
import { ToolCardLayout } from "@/components/toolCard/toolCardLayout";

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const tools = await getToolsByTagSlug({ slug });

  return <div>{tools && <ToolCardLayout tools={tools} />}</div>;
};

export default Page;
