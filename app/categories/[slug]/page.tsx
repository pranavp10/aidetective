import React from "react";
import { getTagBySlug, getTags, getToolsByTagSlug } from "@/fetch/getToolsTags";
import { ToolCardLayout } from "@/components/toolCard/toolCardLayout";
import { Heading } from "@medusajs/ui";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  try {
    const tag = await getTagBySlug({ slug });

    if (!tag) {
      return {
        title: "Not found",
        description: "The page you are looking  for does not exits.",
      };
    }
    return {
      title: `Explore Top ${tag.name} Solutions | AI Detective`,
      description: `Discover the leading AI solutions in our ${tag.name} category at AI Detective. Explore a curated selection of cutting-edge tools and technologies designed to [solve a specific problem, enhance productivity, etc.]. Find the perfect [Industry/Niche] solution to propel your projects forward. Explore the future of ${tag.name} with AI Detective.`,
      alternates: {
        canonical: `/categories/${tag.slug}`,
      },
      openGraph: {
        title: `Explore Top ${tag.name} Solutions | AI Detective`,
        description: `Discover the leading AI solutions in our ${tag.name} category at AI Detective. Explore a curated selection of cutting-edge tools and technologies designed to [solve a specific problem, enhance productivity, etc.]. Find the perfect [Industry/Niche] solution to propel your projects forward. Explore the future of ${tag.name} with AI Detective.`,
        type: "article",
        url: `/categories/${tag.slug}`,
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
    const tools = await getTags();
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
  const tools = await getToolsByTagSlug({ slug });
  const tag = await getTagBySlug({ slug });

  return (
    <div>
      {tools && tag && (
        <div>
          <div className="flex items-center pb-10 mt-14">
            <Heading className="font-bold text-6xl">
              {tag.emoji} {tag.name}
            </Heading>
          </div>
          <ToolCardLayout tools={tools} />
        </div>
      )}
    </div>
  );
};

export default Page;
