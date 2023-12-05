/* eslint-disable @next/next/no-img-element */
"use client";
import { Heading, Text } from "@medusajs/ui";
import { useRouter } from "next/navigation";
import { ToolBookmark } from "./toolBookmark/toolBookmark";
import { pricing } from "@/app/(app)/admin/dashboard/tools/components/fields/pricing";

export const ToolCard = ({ tool }: { tool: Tool }) => {
  const { push } = useRouter();
  const pricingDetails = pricing.find((price) => price.value === tool.pricing);

  return (
    <div
      className="rounded-lg cursor-pointer gap-3 relative flex bg-gray-100 hover:shadow-md px-3 py-2 items-center flex-col"
      onClick={() => push(`/tool/${tool.slug}`)}
    >
      <div className="absolute right-2 top-2">
        <ToolBookmark id={tool.toolId} size={20} />
      </div>
      <img
        src={tool.imageURL !== "-" ? tool.imageURL : "/noImg.png"}
        alt={`${tool.name} landing page`}
        className="rounded-lg w-full h-20 object-cover"
      />
      <div>
        <Heading className="line-clamp-1">{tool.name}</Heading>
        <Text size="xsmall" className="line-clamp-2 text-gray-500 leading-4 ">
          {tool.description}
        </Text>
        <div className="flex mt-2 mb-1">
          {pricingDetails && (
            <div className={`text-[11px] ${pricingDetails.classNames} px-2`}>
              {pricingDetails.label}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
