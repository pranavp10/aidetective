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
        images: [
          {
            url: `/api/og/tool?name=${toolDetails.name}&url=${toolDetails.imageURL}`,
            width: 800,
            height: 400,
            alt: `${toolDetails.name}`,
          },
        ],
      },
    };
  } catch (e) {
    return {
      title: "Not found",
      description: "The page you are looking  for does not exits.",
    };
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
