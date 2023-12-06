/* eslint-disable @next/next/no-img-element */
"use client";
import { Heading, Text } from "@medusajs/ui";
import { useRouter } from "next/navigation";
import { ToolBookmark } from "./toolBookmark/toolBookmark";
import { pricing } from "@/app/(app)/admin/dashboard/tools/components/fields/pricing";
import { ArrowUpRightMini } from "@medusajs/icons";

export const ToolCard = ({ tool }: { tool: Tool }) => {
  const { push } = useRouter();
  const pricingDetails = pricing.find((price) => price.value === tool.pricing);

  return (
    <div
      className="rounded-lg cursor-pointer gap-3 relative flex bg-gray-100 hover:shadow-md px-3 py-2 items-center flex-col"
      onClick={() => push(`/tool/${tool.slug}`)}
    >
      <img
        src={tool.imageURL !== "-" ? tool.imageURL : "/noImg.png"}
        alt={`${tool.name} landing page`}
        className="rounded-lg w-full h-20 object-cover"
      />
      <div>
        <div className="flex justify-between">
          <Heading className="line-clamp-1 font-semibold max-w-[192px] text-gray-900">
            {tool.name}
          </Heading>
          <ToolBookmark id={tool.toolId} size={25} />
        </div>
        <Text size="xsmall" className="line-clamp-2 text-gray-600 leading-4 ">
          {tool.description}
        </Text>
        <div className="flex mt-2 mb-1 items-center justify-between w-full">
          {pricingDetails && (
            <div className={`text-[11px] ${pricingDetails.classNames} px-2`}>
              {pricingDetails.label}
            </div>
          )}
          <a href={`${tool.websiteURL}?via=AiDetective`} target="_blank">
            <ArrowUpRightMini />
          </a>
        </div>
      </div>
    </div>
  );
};
