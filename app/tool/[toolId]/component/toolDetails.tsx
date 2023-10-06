import { Facebook, Linkedin, StarSolid } from "@medusajs/icons";
import { Badge, Button, Heading, Text } from "@medusajs/ui";
import dayjs from "dayjs";
import { Twitter } from "@medusajs/icons";

export const ToolDetails = ({ tool }: { tool: Tool }) => {
  const image = tool.imageURL;
  const name = tool.name;
  const updatedAt = tool.updatedAt;
  const description = tool.description;
  const possibleUseCase = tool.possibleUseCase;
  const tags = tool.tags;
  const websiteURL = tool.websiteURL;
  return (
    <div className="container max-w-7xl mx-auto">
      <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        <div className="lg:col-span-4 lg:row-end-1">
          <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg">
            <img
              src={image}
              alt={image}
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
          <div className="flex flex-col-reverse">
            <div className="mt-4">
              <Heading level="h1">{name}</Heading>
              <Heading level="h2" id="tool-information" className="sr-only">
                {name}
              </Heading>
              <div className="flex justify-between">
                <Text size="small" className="mt-2">
                  (Updated{" "}
                  <time dateTime={dayjs(updatedAt).format("MM D,YYYY")}>
                    {dayjs(updatedAt).format("MM D,YYYY")}
                  </time>
                  )
                </Text>
                <div>
                  {tags.map(({ createdAt, name, tagId }: Tag) => (
                    <Badge size="small" key={tagId}>
                      {name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarSolid key={rating} aria-hidden="true" />
                ))}
              </div>
              <p className="sr-only">4 out of 5 stars</p>
            </div>
          </div>

          <Text
            size="large"
            className="mt-6 whitespace-pre-line text-ui-fg-muted"
          >
            {description}
          </Text>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <a href={websiteURL} target="_blank">
              <Button variant="secondary">Go to website </Button>
            </a>
          </div>
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

          <div className="mt-10 border-t border-ui-border-base pt-10">
            <Heading level="h3" className="text-sm font-medium">
              Share
            </Heading>
            <ul role="list" className="mt-4 flex items-center space-x-6">
              <li>
                <a
                  href="#"
                  className="flex h-6 w-6 items-center justify-center"
                >
                  <Facebook className="text-ui-bg-base" />
                  <span className="sr-only">Share on Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Share on Instagram</span>
                  <Linkedin className="text-ui-bg-base" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Share on Twitter</span>
                  <Twitter className="text-ui-bg-base" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
