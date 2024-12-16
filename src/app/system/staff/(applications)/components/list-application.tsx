"use client";

import { ListApplication } from "@/app/system/_lib/schema";
import DataGrid from "@/app/system/components/datagrid/grid";
import MoreAction from "@/app/system/components/datagrid/more";
import { Icon } from "@/lib/frontend/icons";
import { GridPaginateMeta } from "@/lib/shared/types";
import { Link } from "@nextui-org/react";
import React from "react";

type ApplicationsListProps = {
  meta: GridPaginateMeta;
  applications: ListApplication[];
};

export default function ApplicationsList({
  meta,
  applications,
}: ApplicationsListProps) {
  return (
    <DataGrid
      meta={meta}
      data={applications}
      columns={[
        {
          header: "Job title",
          accessorKey: "job",
        },
        {
          header: "Status",
          accessorKey: "status",
        },
        {
          id: "action",
          cell({ row: { original: application } }) {
            return (
              <MoreAction>
                <MoreAction.Item
                  as={Link}
                  className="text-foreground"
                  href={`?view=${application.id}`}
                  startContent={<Icon name="ViewIcon" />}
                >
                  View
                </MoreAction.Item>

                <MoreAction.Item
                  as={Link}
                  className="text-foreground"
                  href={`?edit=${application.id}`}
                  startContent={<Icon name="Edit2Icon" />}
                  isDisabled={application.status !== "Submitted"}
                >
                  Edit
                </MoreAction.Item>

                <MoreAction.Item
                  as={Link}
                  color="danger"
                  className="text-danger"
                  isDisabled={application.status !== "Submitted"}
                  href={`?remove=${application.id}`}
                  startContent={<Icon name="Trash2Icon" />}
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
