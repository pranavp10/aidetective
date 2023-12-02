"use client";
import { Button } from "@medusajs/ui";
import { useRouter, useSearchParams } from "next/navigation";

export const LoadMore = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        const page = searchParams.get("page");
        if (page && typeof +page === "number") {
          router.push(`/?page=${+page + 1}`, {
            scroll: true,
          });
        }
      }}
    >
      Load More
    </Button>
  );
};
