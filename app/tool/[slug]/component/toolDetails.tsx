/* eslint-disable @next/next/no-img-element */
import { ArrowUpRightMini, Linkedin } from "@medusajs/icons";
import { Button, Heading, Text } from "@medusajs/ui";

export const ToolDetails = ({ tool }: { tool: Tool }) => {
  const image = tool.imageURL !== "-" ? tool.imageURL : "/noImg.png";
  const name = tool.name;
  const description = tool.description;
  const possibleUseCase = tool.possibleUseCase;
  const websiteURL = tool.websiteURL;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-4 w-full">
        <Heading level="h1" className="text-3xl font-medium">
          {name}
        </Heading>
        <a href={`${websiteURL}?via=AiDetective`} target="_blank">
          <Button className="rounded-full">
            Website
            <ArrowUpRightMini />
          </Button>
        </a>
      </div>
      <a href={`${websiteURL}?via=AiDetective`} target="_blank">
        <img src={image} alt={image} className="object-cover rounded-3xl" />
      </a>
      <Text size="large" className="mt-6 whitespace-pre-line">
        {description}
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
                  <Text>{useCase}</Text>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
