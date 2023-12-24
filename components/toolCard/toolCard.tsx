/* eslint-disable @next/next/no-img-element */
"use client";
import { Heading, Text } from "@medusajs/ui";
import { useRouter } from "next/navigation";
import { ToolBookmark } from "./toolBookmark";
import { ArrowUpRightMini } from "@medusajs/icons";
import { pricing } from "@/data/pricing";

export const ToolCard = ({ tool }: { tool: Tool }) => {
  const { push } = useRouter();
  const pricingDetails = pricing.find((price) => price.value === tool.pricing);

  return (
    <div
      className="rounded-lg cursor-pointer gap-3 relative flex bg-gray-100 hover:shadow-md px-3 py-2 flex-col group"
      onClick={() => push(`/tool/${tool.slug}`)}
    >
      <img
        src={
          tool.imageURL !== "-"
            ? tool.imageURL.replace(".jpg", ".webp").replace("http:", "https:")
            : "/noImg.png"
        }
        alt={`${tool.name} landing page`}
        className="rounded-lg w-full h-20 object-cover"
      />
      <div>
        <div className="flex justify-between">
          <Heading className="line-clamp-1 font-semibold max-w-[192px] text-gray-900">
            {tool.name}
          </Heading>
          <ToolBookmark
            id={tool.toolId}
            size={23}
            className="group-hover:visible invisible"
          />
        </div>
        <Text
          size="small"
          className="line-clamp-2 text-gray-600 leading-4 font-medium"
        >
          {tool.description}
        </Text>
        <div className="flex mt-2 mb-1 items-center justify-between w-full">
          {pricingDetails && (
            <div className={`text-[11px] ${pricingDetails.classNames} px-2`}>
              {pricingDetails.label}
            </div>
          )}

          <a
            className="group-hover:visible invisible text-gray-500 hover:text-gray-900"
            href={`${tool.websiteURL}?ref=AiDetective`}
            target="_blank"
          >
            <ArrowUpRightMini />
          </a>
        </div>
      </div>
    </div>
  );
};
