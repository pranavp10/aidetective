/* eslint-disable @next/next/no-img-element */
import { ArrowUpRightMini } from "@medusajs/icons";
import { Button, Heading, Text } from "@medusajs/ui";
import { ToolBookmark } from "@/components/toolCard/toolBookmark/toolBookmark";
import { pricing } from "@/data/pricing";

export const ToolDetails = ({ tool }: { tool: Tool }) => {
  const image =
    tool.imageURL !== "-"
      ? tool.imageURL.replace(".jpg", ".webp").replace("http:", "https:")
      : "/noImg.png";
  const name = tool.name;
  const description = tool.description;
  const possibleUseCase = tool.possibleUseCase;
  const websiteURL = tool.websiteURL;
  const toolId = tool.toolId;
  const pricingDetails = pricing.find((price) => price.value === tool.pricing);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-4 w-full">
        <Heading level="h1" className="text-3xl font-medium">
          {name}
        </Heading>
        <a href={`${websiteURL}?ref=AiDetective`} target="_blank">
          <Button className="rounded-full">
            Website
            <ArrowUpRightMini />
          </Button>
        </a>
      </div>
      <a href={`${websiteURL}?ref=AiDetective`} target="_blank">
        <img src={image} alt={image} className="object-cover rounded-xl" />
      </a>
      <div className="flex mt-4 items-center justify-between w-full">
        {pricingDetails && (
          <div className={`text-[11px] ${pricingDetails.classNames} px-2`}>
            {pricingDetails.label}
          </div>
        )}
        <ToolBookmark
          className="visible group-hover:invisible"
          id={toolId}
          size={25}
        />
      </div>
      <Text size="large" className="mt-3 whitespace-pre-line">
        {description.trim()}
      </Text>
      {possibleUseCase !== "-" && (
        <div className="mt-5 border-t border-ui-border-base pt-5">
          <Heading level="h3" className="text-sm font-medium">
            Highlights
          </Heading>
          <div className="mt-4 ml-9">
            <ul role="list" className="list-decimal">
              {possibleUseCase.split(";").map((useCase) => (
                <li key={useCase}>
                  <Text size="large">{useCase}</Text>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
