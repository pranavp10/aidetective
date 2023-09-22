"use client";
import { ArrowDownTray, ArrowUpTray, Plus, Spinner } from "@medusajs/icons";
import { Button, Heading } from "@medusajs/ui";
import React from "react";
import { AddTag } from "./components/addTag";
import useSWR from "swr";
import TableDemo from "./components/tagsList";

const Tags = () => {
  const { data, error, isLoading } = useSWR<Tags[]>("/api/tags");
  return (
    <div>
      <div className="flex justify-between items-center pt-10 px-10">
        <div>
          <Heading>Tags</Heading>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="secondary">
            <ArrowDownTray />
            Export Tags
          </Button>
          <Button variant="secondary">
            <ArrowUpTray />
            Import Tags
          </Button>
          <AddTag />
        </div>
      </div>
      {isLoading && (
        <div className="h-[calc(100vh-195px)] flex justify-center items-center">
          <Spinner className="animate-spin" />
        </div>
      )}
      {error && <div>Error loading tags </div>}
      {data && <TableDemo tags={data} />}
    </div>
  );
};

export default Tags;
