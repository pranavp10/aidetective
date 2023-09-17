import { ArrowDownTray, ArrowUpTray, Plus } from "@medusajs/icons";
import { Button, Heading } from "@medusajs/ui";
import React from "react";
import { AddProducts } from "./components/addProducts";

const Page = () => {
  return (
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
        <AddProducts />
      </div>
    </div>
  );
};

export default Page;
