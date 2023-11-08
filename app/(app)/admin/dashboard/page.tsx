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
      <div className="flex justify-between items-center pt-10 px-10 mb-4">
        <Heading>Verify Submitted tools</Heading>
        <Input
          placeholder="Search"
          id="search-input"
          type="search"
          size="small"
        />
      </div>
      {isLoading && (
        <div className="h-[calc(100vh-195px)] flex justify-center items-center">
          <Spinner className="animate-spin" />
        </div>
      )}
      {error && <div>Error loading Tools </div>}
      {data && (
        <>
          <div className="h-[calc(100vh-255px)] overflow-y-auto">
            <ToolsList tools={data} />
          </div>
        </>
      )}
    </>
  );
};
export default Page;
