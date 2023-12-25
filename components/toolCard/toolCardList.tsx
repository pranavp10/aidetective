/* eslint-disable @next/next/no-img-element */
"use client";
import { Heading, Text } from "@medusajs/ui";
import { useRouter } from "next/navigation";
import { ToolBookmark } from "./toolBookmark";
import { ArrowUpRightMini } from "@medusajs/icons";
import { pricing } from "@/data/pricing";

export const ToolCardList = ({ tool }: { tool: Tool }) => {
  const { push } = useRouter();
  const pricingDetails = pricing.find((price) => price.value === tool.pricing);

  return (
    <div
      className="rounded-lg cursor-pointer gap-3 relative bg-gray-100 hover:shadow-md px-3 py-2 group border-transparent border-2 hover:border-gray-900 transition duration-300 ease-in-out grid grid-cols-6"
      onClick={() => push(`/tool/${tool.slug}`)}
    >
      <div className="absolute top-0 -translate-y-1/3 translate-x-1/3 right-0">
        <a
          className="group-hover:visible invisible  bg-gray-900 rounded-full text-white w-5 h-5 flex justify-center items-center text-center transition duration-300 ease-in-out"
          href={`${tool.websiteURL}?ref=AiDetective`}
          target="_blank"
        >
          <ArrowUpRightMini />
        </a>
      </div>
      <img
        src={
          tool.imageURL !== "-"
            ? tool.imageURL.replace(".jpg", ".webp").replace("http:", "https:")
            : "/noImg.png"
        }
        alt={`${tool.name} landing page`}
        className="rounded-lg object-cover w-full h-28 col-span-1"
      />

      <div className="col-span-5">
        <div className="flex justify-between items-center w-full">
          <Heading className="line-clamp-1 font-semibold max-w-[192px] text-gray-900">
            {tool.name}
          </Heading>
          <div>
            {pricingDetails && (
              <div className={`text-[11px] ${pricingDetails.classNames} px-2`}>
                {pricingDetails.label}
              </div>
            )}
          </div>
        </div>

        <Text
          size="small"
          className="line-clamp-2 text-gray-600 leading-4 font-medium"
        >
          {tool.description}
        </Text>
        <div className="flex mt-3 w-full justify-between items-center">
          <div className="flex items-center gap-2">
            {[...tool.tags].splice(0, 2).map((tag: Tag) => (
              <div
                key={tag.tagId}
                className="flex w-full items-center rounded-full border border-ui-border-base hover:bg-ui-bg-base-hover gap-2 px-2 bg-white text-ui-fg-subtle"
              >
                <Text>{tag.emoji}</Text>
                <Text className="text-gray-900 text-sm font-medium whitespace-nowrap">
                  {tag.name}
                </Text>
              </div>
            ))}
          </div>
          <ToolBookmark id={tool.toolId} size={23} />
        </div>
      </div>
    </div>
  );
};
