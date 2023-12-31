"use client";
import { Table, DropdownMenu, Badge, StatusBadge, Text } from "@medusajs/ui";
import dayjs from "dayjs";
import {
  ArrowUpRightOnBox,
  EllipsisVertical,
  PencilSquare,
  Trash,
} from "@medusajs/icons";
import { DeleteTool } from "./deleteTool";
import { useState } from "react";
import { EditTools } from "./editTools";

export const ToolsList = ({ tools }: { tools: Tool[] }) => {
  const [deleteId, setDeleteId] = useState<string | undefined>();
  const [editTool, setEditTool] = useState<Tool | undefined>();

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Tool Id</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Slug</Table.HeaderCell>
          <Table.HeaderCell>User</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Create At</Table.HeaderCell>
          <Table.HeaderCell>Links</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tools?.map((tool) => {
          return (
            <Table.Row key={tool.toolId}>
              <Table.Cell>
                <Badge>{tool.toolId}</Badge>
              </Table.Cell>
              <Table.Cell>
                <Text>{tool.name}</Text>
              </Table.Cell>
              <Table.Cell>
                <Badge>{tool.slug}</Badge>
              </Table.Cell>
              <Table.Cell>
                <Badge>{tool.userId}</Badge>
              </Table.Cell>
              <Table.Cell>
                <StatusBadge color={tool.isToolPublished ? "green" : "red"}>
                  {tool.isToolPublished ? "Published" : "Not Published"}
                </StatusBadge>
              </Table.Cell>

              <Table.Cell>
                {dayjs(tool.createdAt).format("DD/MM/YYYY")}
              </Table.Cell>
              <Table.Cell>
                <a href={`/tool/${tool.slug}`} target="_blank">
                  <ArrowUpRightOnBox />
                </a>
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
                      onClick={() => setEditTool(tool)}
                    >
                      <PencilSquare className="text-ui-fg-subtle" />
                      Edit
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      className="gap-x-2"
                      onClick={() => setDeleteId(tool.toolId)}
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
        <DeleteTool
          onClose={() => setDeleteId(undefined)}
          open={!!deleteId}
          toolId={deleteId}
        />
        {editTool && (
          <EditTools onClose={() => setEditTool(undefined)} tool={editTool} />
        )}
      </Table.Body>
    </Table>
  );
};
