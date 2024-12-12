"use client";

import DataGrid from "@/app/system/components/datagrid/grid";
import { GridPaginateMeta } from "@/lib/shared/types";
import React from "react";
import { ListAdmin } from "../_lib/schema";
import RowAction from "@/app/system/components/datagrid/action";

type AdminsListProps = {
  meta: GridPaginateMeta;
  admins: ListAdmin[];
};

export default function AdminsList({ meta, admins }: AdminsListProps) {
  return (
    <DataGrid
      meta={meta}
      data={admins}
      columns={[
        {
          header: "Full name",
          accessorKey: "fullName",
        },
        {
          header: "Designation",
          accessorKey: "designation",
        },
        {
          header: "Role",
          accessorKey: "role",
          cell({ row: { original: admin } }) {
            return admin.role.replaceAll("_", " ");
          },
        },
        {
          id: "action",
          cell({ row: { original: admin } }) {
            return (
              <RowAction>
                <RowAction.EditButton
                  href={`?role=${admin.role}&id=${admin.id}`}
                />

                <RowAction.DeleteButton href={`?v=delete&id=${admin.id}`} />
              </RowAction>
            );
          },
        },
      ]}
    />
  );
}
