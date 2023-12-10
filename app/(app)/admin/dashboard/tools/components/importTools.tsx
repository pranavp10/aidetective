"use client";
import { ArrowUpTray } from "@medusajs/icons";
import { Button, Drawer, FocusModal, Heading, Table, Text } from "@medusajs/ui";
import { useEffect, useState } from "react";
import { parse } from "papaparse";
import useSWR, { mutate } from "swr";
import { Pricing } from "@prisma/client";
import { pricing } from "@/data/pricing";
import axios from "axios";

export const ImportTools = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tools, setTools] = useState<BulkUpload[]>([]);
  const { data } = useSWR<Tag[]>("/api/admin/tags");

  const save = async () => {
    setLoading(true);
    try {
      await axios.post(
        "/api/admin/tools/bulk-upload",
        tools.map((tool) => ({
          ...tool,
          tags: tool.tags.map((tag) => tag.tagId),
        }))
      );
      mutate("/api/admin/tools/unpublished");
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) setTools([]);
  }, [open]);

  return (
    <Drawer>
      <FocusModal open={open} onOpenChange={setOpen}>
        <FocusModal.Trigger asChild>
          <Button variant="secondary" onClick={() => setOpen(true)}>
            <ArrowUpTray />
            Import Tools
          </Button>
        </FocusModal.Trigger>
        <FocusModal.Content onEscapeKeyDown={() => setOpen(false)}>
          <FocusModal.Header>
            <Button isLoading={loading} onClick={save}>
              Save
            </Button>
          </FocusModal.Header>
          <FocusModal.Body className="flex flex-col items-center py-16">
            <div className="flex w-full max-w-7xl flex-col gap-y-8">
              <div className="flex flex-col gap-y-1 justify-center items-center">
                <Heading> Bulk Upload Tools</Heading>
                <Text className="text-ui-fg-subtle">
                  we have a formate to upload the csv
                </Text>
              </div>
              <div className="flex flex-col gap-y-2 w-full justify-center items-center">
                <input
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      if (file.type === "text/csv") {
                        parse(file, {
                          header: false,
                          complete: (result) => {
                            if (typeof result.data === "object") {
                              const tools = getToolsDetails(
                                result.data as string[][],
                                data || []
                              );
                              setTools(tools);
                            }
                          },
                        });
                      }
                    }
                  }}
                  type="file"
                  className="text-sm text-ui-fg-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ui-bg-base-pressed file:text-ui-fg-base hover:file:bg-ui-bg-base-hover"
                />
              </div>
              <div className="h-[calc(100vh-255px)] overflow-y-auto">
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Summery</Table.HeaderCell>
                      <Table.HeaderCell>Description</Table.HeaderCell>
                      <Table.HeaderCell>Possible Use Cases</Table.HeaderCell>
                      <Table.HeaderCell>Pricing</Table.HeaderCell>
                      <Table.HeaderCell>Tags</Table.HeaderCell>
                      <Table.HeaderCell>Website</Table.HeaderCell>
                      <Table.HeaderCell>App store</Table.HeaderCell>
                      <Table.HeaderCell>Play Store</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {tools?.map((tool) => {
                      return (
                        <Table.Row key={tool.websiteURL}>
                          <Table.Cell>{tool.name}</Table.Cell>
                          <Table.Cell>{tool.summary}</Table.Cell>
                          <Table.Cell>{tool.description}</Table.Cell>
                          <Table.Cell>{tool.possibleUseCase}</Table.Cell>
                          <Table.Cell>{tool.pricing}</Table.Cell>
                          <Table.Cell>
                            {tool.tags.map((tag) => tag.name)}
                          </Table.Cell>
                          <Table.Cell>{tool.appStoreURL}</Table.Cell>
                          <Table.Cell>{tool.playStoreURL}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </FocusModal.Body>
        </FocusModal.Content>
      </FocusModal>
    </Drawer>
  );
};

const getToolsDetails = (data: string[][], tags: Tag[]): BulkUpload[] => {
  return data
    .filter((data) => data.length > 6)
    .map((tool: string[]) => ({
      name: tool[0],
      summary: tool[1],
      description: tool[2],
      possibleUseCase: tool[3],
      pricing: getPricing(tool[4]),
      tags: getTagsIds(tool[5], tags),
      websiteURL: tool[6],
      appStoreURL: tool[7],
      playStoreURL: tool[8],
    }));
};

const getPricing = (price: string): Pricing => {
  const pricingValue = pricing.find(({ value }) => value === price);
  if (pricingValue) {
    return pricingValue.value;
  }
  return "freemium";
};

const getTagsIds = (tags: string, allTags: Tag[]): Tag[] => {
  const tagsSlugs = tags.split(";");
  const selectedTags = allTags.filter((tag) => tagsSlugs.includes(tag.slug));
  return selectedTags;
};

type BulkUpload = {
  name: string;
  summary?: string;
  description: string;
  websiteURL: string;
  pricing: Pricing;
  possibleUseCase: string;
  tags: Tag[];
  appStoreURL?: string;
  playStoreURL?: string;
};
