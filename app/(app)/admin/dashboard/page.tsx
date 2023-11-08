"use client";
import { Spinner } from "@medusajs/icons";
import { Heading, Input } from "@medusajs/ui";
import useSWR from "swr";
import { ToolsList } from "./tools/components/toolsList";

const Page = () => {
  const { data, error, isLoading } = useSWR<Tool[]>(
    "/api/admin/tools/unpublished"
  );

  return (
    <>
      <div className="flex justify-between items-center pt-10 px-10">
        <Heading>Verify Submitted tools</Heading>
      </div>
      {isLoading && (
        <div className="h-[calc(100vh-195px)] flex justify-center items-center">
          <Spinner className="animate-spin" />
        </div>
      )}
      {error && <div>Error loading Tools </div>}
      {data && (
        <>
          <div className="flex mb-4 mt-5 px-10 justify-end">
            <Input
              placeholder="Search"
              id="search-input"
              type="search"
              size="small"
            />
          </div>
          <div className="h-[calc(100vh-255px)] overflow-y-auto">
            <ToolsList tools={data} />
          </div>
        </>
      )}
    </>
  );
};
export default Page;
