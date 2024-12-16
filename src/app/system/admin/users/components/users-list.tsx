"use client";

import DataGrid from "@/app/system/components/datagrid/grid";
import { GridPaginateMeta } from "@/lib/shared/types";
import React from "react";
import { ListUser } from "../_lib/schema";
import MoreAction from "@/app/system/components/datagrid/more";
import { Link } from "@nextui-org/react";
import { Icon } from "@/lib/frontend/icons";

type UsersListProps = {
  meta: GridPaginateMeta;
  users: ListUser[];
};

export default function UsersList({ meta, users }: UsersListProps) {
  return (
    <DataGrid
      meta={meta}
      data={users}
      columns={[
        {
          header: "Full name",
          accessorKey: "fullName",
        },
        {
          header: "Email",
          accessorKey: "email",
        },
        {
          header: "Role",
          accessorKey: "userType",
          cell({ row: { original: user } }) {
            return user.userType.replaceAll("_", " ");
          },
        },
        {
          header: "Status",
          accessorKey: "status",
        },
        {
          id: "action",
          cell({ row: { original: user } }) {
            return (
              <MoreAction>
                <MoreAction.Item
                  as={Link}
                  className="text-foreground"
                  startContent={<Icon name="EditIcon" />}
                  href={`?status=${user.status}&id=${user.id}`}
                >
                  Change status
                </MoreAction.Item>
                <MoreAction.Item
                  as={Link}
                  color="warning"
                  className="text-warning"
                  href={`?v=reset&id=${user.id}`}
                  startContent={<Icon name="RefreshCcwDotIcon" />}
                >
                  Reset password
                </MoreAction.Item>
              </MoreAction>
            );
          },
        },
      ]}
    />
  );
}
