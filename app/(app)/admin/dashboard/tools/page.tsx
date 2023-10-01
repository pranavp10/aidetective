"use client";
import { ArrowDownTray, ArrowUpTray } from "@medusajs/icons";
import { Button, Heading } from "@medusajs/ui";
import React from "react";
import { AddTools } from "./components/addTools";
import useSWR from "swr";

const Page = () => {
  const { data, error, isLoading } = useSWR<Tool[]>("/api/tools");
  return (
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
  );
};

export default Page;
