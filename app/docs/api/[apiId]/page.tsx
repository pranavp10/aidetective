"use client";

import { useParams } from "next/navigation";
import { apiData } from "../data";
import { Badge, CodeBlock, Command, Heading, Label, Text } from "@medusajs/ui";

const Page = () => {
  const params = useParams();
  const apiId = params.apiId as string;
  const data = apiData
    .flatMap((data) => data.details)
    .find((data) => data.actions.href.includes(apiId));
  if (data) {
    return (
      <div>
        <Heading level="h1" className="text-3xl">
          {data.actions.title}
        </Heading>
        <div className="w-full mt-4">
          <Heading>Response</Heading>
          <div className="w-full">
            <CodeBlock
              snippets={[
                {
                  code: JSON.stringify(data.actions.response, null, 2),
                  language: "tsx",
                  label: data.actions.href,
                },
              ]}
            >
              <CodeBlock.Header hideLabels={true}>
                <Badge size="base" color="green">
                  {data.actions.method}
                </Badge>
                <code className="text-ui-code-text-base">
                  {data.actions.apiLink}
                </code>
                <Command.Copy
                  content={data.actions.apiLink}
                  className="ml-auto"
                />
              </CodeBlock.Header>
              <CodeBlock.Body />
            </CodeBlock>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Page;
