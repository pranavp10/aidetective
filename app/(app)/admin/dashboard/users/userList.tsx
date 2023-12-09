"use client";
import { Table, Badge } from "@medusajs/ui";
import { User } from "@prisma/client";

export const UserList = ({ users }: { users: User[] }) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Role</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Image</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users?.map((user) => {
          return (
            <Table.Row key={user.id}>
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>
                <Badge>{user.email}</Badge>
              </Table.Cell>
              <Table.Cell>
                <Badge color={user.role === "SUPER_ADMIN" ? "red" : "blue"}>
                  {user.role}
                </Badge>
              </Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>
                {user.image ? (
                  <img src={user.image} className="w-6 h-6 rounded-full" />
                ) : (
                  "-"
                )}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
