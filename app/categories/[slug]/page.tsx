import React from "react";
import { getTagBySlug, getToolsByTagSlug } from "@/fetch/getToolsTags";
import { ToolCardLayout } from "@/components/toolCard/toolCardLayout";
import { mappedTags } from "@/data/tags";

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
        images: [
          {
            url: `/api/og/categories?name${tag.emoji} ${tag.name}`,
            width: 800,
            height: 400,
            alt: `${tag.emoji} ${tag.name}`,
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
  const tools = await getToolsByTagSlug({ slug });
  const tag = mappedTags.find((mappedTag) => mappedTag.slug === slug);

  return <div>{tools && <ToolCardLayout tools={tools} />}</div>;
};

export default Page;
