import { Heading } from "@medusajs/ui";
import { Bookmark } from "./component/bookmark";

const Dashboard = () => {
  return (
    <div className="mt-4 grid gap-4">
      <Heading>Bookmarks</Heading>
      <Bookmark />
    </div>
  );
};

export default Dashboard;
