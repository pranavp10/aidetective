// "use client";
import { Facebook, Linkedin, StarSolid } from "@medusajs/icons";
import { Badge, Button, Heading, IconButton, Text } from "@medusajs/ui";
// import dayjs from "dayjs";
import { Twitter } from "@medusajs/icons";
import { ToolBookmark } from "@/components/toolCard/toolBookmark/toolBookmark";

export const ToolDetails = ({ tool }: { tool: Tool }) => {
  const image = tool.imageURL !== "-" ? tool.imageURL : "/noImg.png";
  const name = tool.name;
  const description = tool.description;
  const summary = tool.summary;
  const possibleUseCase = tool.possibleUseCase;
  const tags = tool.tags;
  const websiteURL = tool.websiteURL;

  console.log("My tool", tool);

  return (
    <div className="container max-w-7xl mx-auto">
      <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
          <div className="flex flex-col-reverse">
            <div className="mt-4">
              <div className="flex items-center justify-between mb-4">
                <Heading level="h1" className="text-3xl font-medium">
                  {name}
                </Heading>
                <Heading level="h2" id="tool-information" className="sr-only">
                  {name}
                </Heading>
                <ToolBookmark size={30} id={tool.toolId} />
              </div>

              <div>
                {summary === "-" ? (
                  <div></div>
                ) : (
                  <Text
                    size="large"
                    className="mt-6 whitespace-pre-line text-ui-fg-muted"
                  >
                    {summary}
                  </Text>
                )}
              </div>
            </div>

            <div>
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarSolid key={rating} aria-hidden="true" />
                ))}
              </div>
            </div>
          </div>

          <div className="my-4">
            <a href={`${websiteURL}?via=AiDetective`} target="_blank">
              <Button variant="secondary">Visit Website </Button>
            </a>
          </div>

          <div className="mt-10 border-t border-ui-border-base pt-10">
            <Heading level="h3" className="text-sm font-medium">
              Share
            </Heading>
            <ul role="list" className="mt-4 flex items-center space-x-6">
              <li>
                <a
                  href="https://linkedin.com/company/aidetective"
                  className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Share on Twitter</span>
                  <Twitter className="text-ui-bg-base" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/AiDetective_xyz"
                  className="flex h-6 w-6 items-center justify-center"
                >
                  <span className="sr-only">Share on Linkedin</span>
                  <Linkedin className="text-ui-bg-base" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            {possibleUseCase === "-" ? (
              <div></div>
            ) : (
              <div className="mt-10 border-t border-ui-border-base pt-10">
                <Heading level="h3" className="text-sm font-medium">
                  Highlights
                </Heading>
                <div className="mt-4 ml-9">
                  <ul role="list" className="list-decimal text-ui-fg-muted">
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
          <div>
            <Text
              size="large"
              className="mt-6 whitespace-pre-line text-ui-fg-muted"
            >
              {description}
            </Text>
          </div>
        </div>

        <div className="lg:col-span-4 lg:row-end-1">
          <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg">
            <a href={`${websiteURL}?via=AiDetective`} target="_blank">
              <img
                src={image}
                alt={image}
                className="object-cover object-center border-grey-500 border-solid border-5"
              />
            </a>
          </div>
          <div className="flex items-center gap-2 flex-wrap my-5">
            {tags.map(({ createdAt, name, tagId }: Tag) => (
              <Badge size="small" key={tagId}>
                {name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
