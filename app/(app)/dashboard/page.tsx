import { SubmitTool } from "@/components/cta/submitTool";
import { Button, Text } from "@medusajs/ui";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="container flex items-center justify-between px-4 py-3 md:px-8 mx-auto">
      <SubmitTool />
    </div>
  );
};

export default Dashboard;
