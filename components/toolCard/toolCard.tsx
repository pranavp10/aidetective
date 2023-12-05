/* eslint-disable @next/next/no-img-element */
"use client";
import { Heading, Text } from "@medusajs/ui";
import { useRouter } from "next/navigation";
import { ToolBookmark } from "./toolBookmark/toolBookmark";
import { pricing } from "@/app/(app)/admin/dashboard/tools/components/fields/pricing";

const lightColors = [
  "hsl(54, 100%, 96%)", // Very light vivid yellow
  "hsl(33, 92%, 96%)", // Very light vibrant orange
  "hsl(348, 92%, 96%)", // Very light energetic red
  "hsl(6, 27%, 96%)", // Very light deep red
  "hsl(206, 55%, 96%)", // Very light cool blue
  "hsl(150, 85%, 96%)", // Very light lush green
  "hsl(167, 88%, 96%)", // Very light spring green
  "hsl(322, 85%, 96%)", // Very light fuchsia
  "hsl(38, 100%, 96%)", // Very light orange
  "hsl(19, 76%, 96%)", // Very light chocolate
  "hsl(258, 11%, 96%)", // Very light lavender
  "hsl(168, 100%, 96%)", // Very light pale green
  "hsl(194, 100%, 96%)", // Very light turquoise
  "hsl(48, 100%, 96%)", // Very light light yellow
  "hsl(60, 100%, 96%)", // Very light yellow
  "hsl(8, 75%, 96%)", // Very light coral
  "hsl(359, 50%, 96%)", // Very light maroon
  "hsl(121, 56%, 96%)", // Very light green
  "hsl(202, 50%, 96%)", // Very light blue
  "hsl(182, 100%, 96%)", // Very light cyan
  "hsl(248, 10%, 96%)", // Very light blue violet
  "hsl(6, 89%, 96%)", // Very light light salmon
  "hsl(19, 80%, 96%)", // Very light sienna
  "hsl(7, 76%, 96%)", // Very light brown
  "hsl(12, 100%, 96%)", // Very light orange red
  "hsl(326, 56%, 96%)", // Very light orchid
  "hsl(176, 100%, 96%)", // Very light medium spring green
];

export const ToolCard = ({ tool }: { tool: Tool }) => {
  const { push } = useRouter();
  const pricingDetails = pricing.find((price) => price.value === tool.pricing);

  function getRandomLightColor() {
    const randomIndex = Math.floor(Math.random() * (lightColors.length - 1));
    return lightColors[randomIndex];
  }

  return (
    <div
      className="rounded-lg cursor-pointer gap-3 relative flex bg-gray-100/60 hover:shadow-md px-3 py-2 items-center flex-col"
      onClick={() => push(`/tool/${tool.slug}`)}
      style={{
        backgroundColor: getRandomLightColor(),
      }}
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
