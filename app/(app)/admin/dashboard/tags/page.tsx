"use client";
import { ArrowDownTray, Spinner } from "@medusajs/icons";
import { Button, Heading, Input, useToast } from "@medusajs/ui";
import React from "react";
import { AddTag } from "./components/addTag";
import useSWR from "swr";
import { TagTable } from "./components/tagsList";
import { unparse } from "papaparse";
import { BulkUpload } from "./components/bulkUpload";

const Tag = () => {
  const { toast } = useToast();
  const { data, error, isLoading } = useSWR<Tag[]>("/api/admin/tags");
  return (
    <div>
      <div className="flex justify-between items-center pt-10 px-10">
        <Heading>Tag</Heading>
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            onClick={() => {
              if (data) {
                var csv = unparse(data);
                var blob = new Blob([csv]);
                var a = window.document.createElement("a");
                a.href = window.URL.createObjectURL(blob);
                a.download = "superflex-tags.csv";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              } else {
                toast({
                  title: "Loading!",
                  description: "data is still loading",
                  variant: "info",
                  duration: 2000,
                });
              }
            }}
          >
            <ArrowDownTray />
            Export Tag
          </Button>
          <BulkUpload />
          <AddTag />
        </div>
      </div>
      {isLoading && (
        <div className="h-[calc(100vh-195px)] flex justify-center items-center">
          <Spinner className="animate-spin" />
        </div>
      )}
      {error && <div>Error loading tags </div>}
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
            <TagTable tags={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default Tag;
