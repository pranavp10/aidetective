import { SubmitTool } from "@/components/cta/submitTool";
import { Heading } from "@medusajs/ui";
import { Bookmark } from "./component/bookmark";

const Dashboard = () => {
  return (
    <div className="container flex items-center justify-between px-4 py-3 md:px-8 mx-auto">
      <div className="w-full">
        <SubmitTool />
        <div className="mt-4 flex flex-col gap-4">
          <Heading>Bookmarks</Heading>
          <Bookmark />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
