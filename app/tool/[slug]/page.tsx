import React from "react";
import { ToolDetails } from "./component/toolDetails";
import { Heading } from "@medusajs/ui";
import { ToolCardLayout } from "@/components/toolCard/toolCardLayout";
import { getToolsDetails, getToolsTags } from "@/fetch/getToolsTags";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  try {
    const toolDetails = await getToolsDetails({ slug });

    if (!toolDetails) {
      return {
        title: "Not found",
        description: "The page you are looking  for does not exits.",
      };
    }
    return {
      title: toolDetails.name,
      description: toolDetails.description,
      alternates: {
        canonical: `/tool/${toolDetails.slug}`,
      },
      openGraph: {
        title: toolDetails.name,
        description: toolDetails.description,
        type: "article",
        url: `/tool/${toolDetails.slug}`,
      },
    };
  } catch (e) {
    return {
      title: "Not found",
      description: "The page you are looking  for does not exits.",
    };
  }
}

export async function generateStaticParams() {
  try {
    const tools = await getToolsTags();
    return (
      tools?.map((tool) => ({
        slug: tool.slug,
      })) || []
    );
  } catch (e) {
    return [];
  }
}

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const toolDetails = await getToolsDetails({ slug });

  if (!toolDetails) return <div>Page not found</div>;

  return (
    <div>
      {toolDetails.name ? <ToolDetails tool={toolDetails} /> : <></>}
      <Heading className="my-6">Related tools</Heading>
      <ToolCardLayout tools={toolDetails.tags.map((tag) => tag.tools).flat()} />
    </div>
  );
};

export default Page;
