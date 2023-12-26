import { Heading } from "@medusajs/ui";
import { getBookmark, getSubmittedTools } from "@/fetch/bookMark";
import { ToolCardLayout } from "@/components/toolCard/toolCardLayout";
import { ToolCardAdminLayout } from "@/components/toolCard/toolCardAdminLayout";

const Dashboard = async () => {
  const [bookmarkedTool, submittedTools] = await Promise.all([
    getBookmark(),
    getSubmittedTools(),
  ]);

  return (
    <div>
      <div className="mt-4 grid gap-4">
        <Heading>Submitted Tool</Heading>
        {submittedTools && <ToolCardAdminLayout tools={submittedTools} />}
      </div>
      <div className="mt-4 grid gap-4">
        <Heading>Bookmarks</Heading>
        {bookmarkedTool && <ToolCardLayout tools={bookmarkedTool} />}
      </div>
    </div>
  );
};

export default Dashboard;
