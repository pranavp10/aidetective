import React from "react";
import { ToolDetails } from "./component/toolDetails";
import { Heading } from "@medusajs/ui";
import { ToolCardLayout } from "@/components/toolCard/toolCardLayout";
import { getToolsDetails } from "@/fetch/getToolsTags";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  try {
    const data = await getToolsDetails({ slug });

    if (!data?.toolDetails) {
      return {
        title: "Not found",
        description: "The page you are looking  for does not exits.",
      };
    }
    return {
      title: data?.toolDetails.name,
      description: data?.toolDetails.description,
      alternates: {
        canonical: `/tool/${data?.toolDetails.slug}`,
      },
      openGraph: {
        title: data?.toolDetails.name,
        description: data?.toolDetails.description,
        type: "article",
        url: `/tool/${data?.toolDetails.slug}`,
        images: [
          {
            url: `/api/og/tool?name=${data?.toolDetails.name}&url=${data?.toolDetails.imageURL}`,
            width: 800,
            height: 400,
            alt: `${data?.toolDetails.name}`,
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
  const data = await getToolsDetails({ slug });

  if (!data) return <div>Page not found</div>;

  return (
    <div>
      {data.toolDetails.name ? <ToolDetails tool={data.toolDetails} /> : <></>}
      <Heading className="my-6">Related tools</Heading>
      <ToolCardLayout tools={data.relatedTools} />
    </div>
  );
};

export default Page;
