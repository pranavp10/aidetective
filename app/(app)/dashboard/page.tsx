import { Button, Text } from "@medusajs/ui";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="container flex items-center justify-between px-4 py-3 md:px-8 mx-auto">
      <Link href="/user/tool/submit-tool" className="w-full flex">
        <div className="bg-ui-bg-component border-ui-border-base border flex  w-full p-4 rounded-lg justify-between">
          <div className="flex items-center gap-4">
            <div>
              <Text className="text-xl font-bold">Submit a tool</Text>
              <Text>
                We&apos;re always on the lookout for the latest and greatest AI
                tools to add to our directory.
              </Text>
            </div>
          </div>
          <div className="flex items-center">
            <Button>Submit tool</Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
