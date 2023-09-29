"use client";
import { Table, DropdownMenu, Badge } from "@medusajs/ui";
import dayjs from "dayjs";
import { EllipsisVertical, PencilSquare, Trash } from "@medusajs/icons";
import { DeleteTag } from "./deleteTag";
import { useState } from "react";
import { EditTag } from "./editTag";

export const TagTable = ({ tags }: { tags: Tag[] }) => {
  const [deleteId, setDeleteId] = useState<string | undefined>();
  const [editTag, setEditTag] = useState<Tag | undefined>();
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Tag Name</Table.HeaderCell>
          <Table.HeaderCell>Slug</Table.HeaderCell>
          <Table.HeaderCell>Create At</Table.HeaderCell>
          <Table.HeaderCell>Updated At</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tags?.map((tag) => {
          return (
            <Table.Row key={tag.tagId}>
              <Table.Cell>{tag.tagId}</Table.Cell>
              <Table.Cell>
                <Badge>{tag.name}</Badge>
              </Table.Cell>
              <Table.Cell>{tag.slug}</Table.Cell>
              <Table.Cell>
                {dayjs(tag.createdAt).format("DD/MM/YYYY")}
              </Table.Cell>
              <Table.Cell>
                {dayjs(tag.updatedAt).format("DD/MM/YYYY")}
              </Table.Cell>
              <Table.Cell>
                <DropdownMenu>
                  <DropdownMenu.Trigger>
                    <EllipsisVertical />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content
                    className="flex flex-col justify-start w-fit"
                    style={{ minWidth: "10px" }}
                    align="end"
                  >
                    <DropdownMenu.Item
                      className="gap-x-2"
                      onClick={() => setEditTag(tag)}
                    >
                      <PencilSquare className="text-ui-fg-subtle" />
                      Edit
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      className="gap-x-2"
                      onClick={() => setDeleteId(tag.tagId)}
                    >
                      <Trash className="text-ui-fg-subtle" />
                      Delete
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu>
              </Table.Cell>
            </Table.Row>
          );
        })}
        <DeleteTag
          onClose={() => setDeleteId(undefined)}
          open={!!deleteId}
          tagId={deleteId}
        />
        <EditTag
          open={!!editTag}
          onClose={() => setEditTag(undefined)}
          tag={editTag}
        />
      </Table.Body>
    </Table>
  );
};
