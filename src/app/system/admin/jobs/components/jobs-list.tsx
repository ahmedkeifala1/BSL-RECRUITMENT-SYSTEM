"use client";

import React from "react";
import { ListJob } from "../_lib/schemas";
import DataGrid from "@/app/system/components/datagrid/grid";
import { GridPaginateMeta } from "@/lib/shared/types";
import MoreAction from "@/app/system/components/datagrid/more";
import { Link } from "@nextui-org/react";
import { EditIcon, TrashIcon, ViewIcon } from "lucide-react";

type ListJobsProps = {
  jobs: ListJob[];
  meta: GridPaginateMeta;
};

export default function JobsList({ jobs, meta }: ListJobsProps) {
  return (
    <>
      <DataGrid
        data={jobs}
        meta={meta}
        columns={[
          {
            header: "Posted on",
            accessorKey: "createdAt",
            cell({ row: { original: job } }) {
              return job.createdAt.toDateString();
            },
          },
          {
            header: "Title",
            accessorKey: "title",
          },
          {
            header: "Type",
            accessorKey: "type",
            cell({ row: { original: job } }) {
              return job.type.replaceAll("_", " ");
            },
          },
          {
            id: "vacancies",
            accessorKey: "vacancies",
            header: () => <div className="flex justify-center">Vacancies</div>,
            cell({ row: { original: job } }) {
              return (
                <div className="flex justify-center">
                  <strong>{job.vacancies}</strong>
                </div>
              );
            },
          },
          {
            id: "action",
            cell({ row: { original: job } }) {
              return (
                <MoreAction>
                  <MoreAction.Section>
                    <MoreAction.Item
                      as={Link}
                      className="text-foreground"
                      startContent={<ViewIcon size={15} />}
                      href={`jobs/${job.id}`}
                    >
                      View
                    </MoreAction.Item>

                    <MoreAction.Item
                      className="text-foreground"
                      startContent={<EditIcon size={15} />}
                      href={`?v=edit&id=${job.id}`}
                    >
                      Edit
                    </MoreAction.Item>
                  </MoreAction.Section>

                  <MoreAction.Item
                    as={Link}
                    color="danger"
                    className="text-danger"
                    startContent={<TrashIcon size={15} />}
                    href={`?v=delete&id=${job.id}`}
                  >
                    Delete
                  </MoreAction.Item>
                </MoreAction>
              );
            },
          },
        ]}
      />
    </>
  );
}
