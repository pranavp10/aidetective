import { ArrowDownTray, ArrowUpTray, Plus } from "@medusajs/icons";
import { Button, Heading } from "@medusajs/ui";
import React from "react";

const Tags = () => {
  return (
    <div className="flex justify-between items-center">
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
        <Button variant="secondary">
          <Plus />
          Add Tags
        </Button>
      </div>
    </div>
  );
};

export default Tags;
