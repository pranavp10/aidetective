import { Table, Button, DropdownMenu, Input } from "@medusajs/ui";
import dayjs from "dayjs";
import { EllipsisVertical, PencilSquare, Trash } from "@medusajs/icons";

const TableDemo = ({ tags }: { tags: Tags[] }) => (
  <div className="mt-3">
    <div className="flex mb-4 mt-5 px-10 justify-end">
      <Input
        placeholder="Search"
        id="search-input"
        type="search"
        size="small"
      />
    </div>
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
              <Table.Cell>{tag.name}</Table.Cell>
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
                    <DropdownMenu.Item className="gap-x-2">
                      <PencilSquare className="text-ui-fg-subtle" />
                      Edit
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="gap-x-2">
                      <Trash className="text-ui-fg-subtle" />
                      Delete
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  </div>
);

export default TableDemo;
