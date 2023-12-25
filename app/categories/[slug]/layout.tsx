import React from "react";
import { Heading } from "@medusajs/ui";
import { getTagBySlug } from "@/fetch/getToolsTags";

export default async function Layout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const tag = await getTagBySlug({ slug });

  return (
    <div>
      <div>
        {tag && (
          <div className="flex gap-4 pb-8 pt-8 items-center">
            <div className="font-bold text-3xl rounded-md bg-gray-50 p-3 w-16 h-16 flex items-center justify-center">
              {tag.emoji}
            </div>
            <div>
              <Heading className="font-semibold text-2xl">{tag.name}</Heading>
              <Heading className="font-bold text-xl text-gray-500">
                AI tools for {tag.name}
              </Heading>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
