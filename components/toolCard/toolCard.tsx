/* eslint-disable @next/next/no-img-element */
"use client";
import { Heading, Text } from "@medusajs/ui";
import { ToolBookmark } from "./toolBookmark";
import { ArrowUpRightMini } from "@medusajs/icons";
import { pricing } from "@/data/pricing";
import { useSession } from "next-auth/react";

export const ToolCard = ({ tool }: { tool: Tool }) => {
  const pricingDetails = pricing.find((price) => price.value === tool.pricing);
  const { data } = useSession();
  const isToolOwner = data?.user.id === tool.userId;
  const isFeatured = tool.isFeatured;

  return (
    <div
      className={`relative ${
        isToolOwner || isFeatured
          ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg p-0.5"
          : ""
      }`}
    >
      {(isToolOwner || isFeatured) && (
        <div className="bg-gradient-to-r from-pink-500 text-xs px-2 py-0.5 via-red-500 to-yellow-500 text-white rounded-full absolute top-0 right-2 z-10 -translate-y-1/2">
          {isFeatured && "Featured"} {isFeatured && isToolOwner && "/"}{" "}
          {isToolOwner && "Owner"}
        </div>
      )}
      <div className="rounded-md gap-3 relative flex bg-gray-100 px-3 py-2 flex-col group hover:shadow-md">
        <img
          src={
            tool.imageURL !== "-"
              ? tool.imageURL
                  .replace(".jpg", ".webp")
                  .replace("http:", "https:")
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
    </div>
  );
};
