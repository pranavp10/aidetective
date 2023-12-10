import { ArrowUpTray } from "@medusajs/icons";
import { Button, Drawer, useToast } from "@medusajs/ui";
import React, { useState } from "react";
import { parse } from "papaparse";
import { Badge } from "@medusajs/ui";
import axios from "axios";
import { mutate } from "swr";

export const BulkUpload = () => {
  const [tagsList, setTagsList] = useState<string[] | undefined>();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const upload = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post<{ count: number }>(
        "/api/admin/tags/bulk-upload",
        {
          tagList: tagsList,
        }
      );
      mutate("/api/admin/tags");
      setIsLoading(false);
      setOpen(false);
      toast({
        title: "Success",
        description: `${data.count} tags upload`,
        variant: "success",
        duration: 2000,
      });
    } catch (e: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "unable to upload tag list",
        variant: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Drawer open={open} modal={true} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          <ArrowUpTray />
          Import Tag
        </Button>
      </Drawer.Trigger>
      <Drawer.Content onEscapeKeyDown={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Bulk Upload Tags </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="p-4">
          <input
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                if (file.type === "text/csv") {
                  parse(file, {
                    header: false,
                    complete: (result) => {
                      if (typeof result.data === "object") {
                        setTagsList(result.data.flat() as string[]);
                      }
                    },
                  });
                }
              }
            }}
            type="file"
            className="block w-full text-sm text-ui-fg-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ui-bg-base-pressed file:text-ui-fg-base hover:file:bg-ui-bg-base-hover"
          />
          <div className="flex flex-wrap gap-3 mt-6 overflow-y-auto">
            {tagsList?.map((tag, index) => {
              return <Badge key={`${tag}-${index}`}>{tag}</Badge>;
            })}
          </div>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button
              disabled={isLoading}
              onClick={() => setOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
          </Drawer.Close>
          <Button onClick={upload} isLoading={isLoading}>
            Save
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
};
