"use client";
import { ArrowDownTray, ArrowUpTray, Plus, Spinner } from "@medusajs/icons";
import { Button, Heading, useToast } from "@medusajs/ui";
import React from "react";
import { AddTag } from "./components/addTag";
import useSWR from "swr";
import { TagTable } from "./components/tagsList";
import { unparse } from "papaparse";
const Tag = () => {
  const { toast } = useToast();
  const { data, error, isLoading } = useSWR<Tag[]>("/api/tags");
  return (
    <div>
      <div className="flex justify-between items-center pt-10 px-10">
        <div>
          <Heading>Tag</Heading>
        </div>
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
          <Button variant="secondary">
            <ArrowUpTray />
            Import Tag
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
      {data && <TagTable tags={data} />}
    </div>
  );
};

export default Tag;
