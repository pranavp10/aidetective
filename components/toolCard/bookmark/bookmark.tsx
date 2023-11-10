"use client";
import axios from "axios";
import { Bookmark } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const ToolBookmark = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const { data } = useSWR<Tool[]>(
    session?.user.id ? "/api/bookmark" : undefined
  );

  const [bookmark, setBookmark] = useState<boolean>(false);

  useEffect(() => {
    setBookmark(data?.some((tool) => tool.toolId === id) || false);
  }, [data]);

  const bookmarkTool = async () => {
    try {
      setBookmark(true);
      await axios.post<Tool>(`/api/bookmark/${id}`);
    } catch (e) {
      setBookmark(false);
    }
  };

  const unBookmarkTool = async () => {
    try {
      setBookmark(false);
      await axios.delete<Tool>(`/api/bookmark/${id}`);
    } catch (e) {
      setBookmark(true);
    }
  };

  if (data)
    return (
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          if (bookmark) {
            unBookmarkTool();
          } else {
            setBookmark(true);
            bookmarkTool();
          }
        }}
      >
        {bookmark ? (
          <Bookmark className="text-2xl" size="50" fill="#740404" />
        ) : (
          <Bookmark className="text-2xl" size="50" />
        )}
      </div>
    );
  return null;
};
