"use client";
import { ArrowDownTray, ArrowUpTray, Spinner } from "@medusajs/icons";
import { Button, Heading, Input } from "@medusajs/ui";
import React from "react";
import { AddTools } from "./components/addTools";
import useSWR from "swr";
import { ToolsList } from "./components/toolsList";

const Page = () => {
  const { data, error, isLoading } = useSWR<Tool[]>("/api/tools");
  return (
    <>
      <div className="flex justify-between items-center pt-10 px-10">
        <Heading>Tools</Heading>
        <div className="flex items-center gap-4">
          <Button variant="secondary">
            <ArrowDownTray />
            Export Tools
          </Button>
          <Button variant="secondary">
            <ArrowUpTray />
            Import Tools
          </Button>
          <AddTools />
        </div>
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
