"use client";

import React from "react";
import { ListStaff } from "../_lib/schema";
import { GridPaginateMeta } from "@/lib/shared/types";
import DataGrid from "@/app/system/components/datagrid/grid";
import MoreAction from "@/app/system/components/datagrid/more";
import { Link } from "@nextui-org/react";
import { EditIcon, TrashIcon } from "lucide-react";

type ListStaffProps = {
  staff: ListStaff[];
  meta: GridPaginateMeta;
};

export default function StaffList({ meta, staff }: ListStaffProps) {
  return (
    <DataGrid
      data={staff}
      meta={meta}
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
          header: "Designation",
          accessorKey: "designation",
        },
        {
          header: "Department",
          accessorKey: "department",
        },
        {
          header: "Division",
          accessorKey: "division",
        },
        {
          header: "Unit",
          accessorKey: "unit",
        },
        {
          header: "Admin",
          accessorKey: "isAdmin",
          cell({ row: { original: staff } }) {
            return staff.isAdmin ? "Yes" : "No";
          },
        },
        {
          id: "action",
          cell({ row: { original: staff } }) {
            return (
              <MoreAction>
                <MoreAction.Section>
                  <MoreAction.Item
                    className="text-foreground"
                    startContent={<EditIcon size={15} />}
                    href={`?v=edit&id=${staff.id}`}
                  >
                    Edit
                  </MoreAction.Item>
                </MoreAction.Section>

                <MoreAction.Item
                  as={Link}
                  color="danger"
                  className="text-danger"
                  isDisabled={staff.isAdmin}
                  startContent={<TrashIcon size={15} />}
                  href={`?v=delete&id=${staff.id}`}
                >
                  Delete
                </MoreAction.Item>
              </MoreAction>
            );
          },
        },
      ]}
    />
  );
}
