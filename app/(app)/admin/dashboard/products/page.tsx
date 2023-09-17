import { ArrowDownTray, ArrowUpTray, Plus } from "@medusajs/icons";
import { Button, Heading } from "@medusajs/ui";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-ui-bg-base-pressed">
      <div className="p-10 h-full w-full">
        <div className="flex h-full rounded-2xl bg-ui-bg-base p-10 w-full">
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div>
                <Heading>Products</Heading>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="secondary">
                  <ArrowDownTray />
                  Export Products
                </Button>
                <Button variant="secondary">
                  <ArrowUpTray />
                  Import Products
                </Button>
                <Button variant="secondary">
                  <Plus />
                  Add Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
