"use client";

import React from "react";
import { ListVacancy } from "../_lib/schemas";
import DataGrid from "@/app/system/components/datagrid/grid";
import { GridPaginateMeta } from "@/lib/shared/types";
import MoreAction from "@/app/system/components/datagrid/more";
import { Link } from "@nextui-org/react";
import { EditIcon, TrashIcon, Users2Icon, ViewIcon } from "lucide-react";

type ListVacanciesProps = {
  vacancies: ListVacancy[];
  meta: GridPaginateMeta;
};

export default function ListVacancies({ vacancies, meta }: ListVacanciesProps) {
  return (
    <DataGrid
      data={vacancies}
      meta={meta}
      columns={[
        {
          header: "Posted on",
          accessorKey: "postedAt",
          cell({ row: { original: vacancy } }) {
            return vacancy.postedAt.toDateString();
          },
        },
        {
          header: "Job title",
          accessorKey: "job",
        },
        {
          header: "Job type",
          accessorKey: "employmentType",
          cell({ row: { original: vacancy } }) {
            return vacancy.employmentType.replaceAll("_", " ");
          },
        },
        {
          header: "Type",
          accessorKey: "type",
        },
        {
          id: "applicants",
          accessorKey: "applicants",
          header: () => <div className="flex justify-center">Applicants</div>,
          cell({ row: { original: job } }) {
            return (
              <div className="flex justify-center">
                <strong>{job.applicants}</strong>
              </div>
            );
          },
        },
        {
          header: "Deadline",
          accessorKey: "deadline",
          cell({ row: { original: vacancy } }) {
            return vacancy.deadline.toDateString();
          },
        },
        {
          id: "action",
          cell({ row: { original: vacancy } }) {
            return (
              <MoreAction>
                <MoreAction.Section>
                  <MoreAction.Item
                    as={Link}
                    className="text-foreground"
                    startContent={<ViewIcon size={15} />}
                    href={`vacancies/${vacancy.id}`}
                  >
                    View
                  </MoreAction.Item>

                  <MoreAction.Item
                    className="text-foreground"
                    startContent={<EditIcon size={15} />}
                    href={`?v=edit&id=${vacancy.id}`}
                  >
                    Edit
                  </MoreAction.Item>
                  <MoreAction.Item
                    className="text-foreground"
                    isDisabled={vacancy.applicants < 1}
                    startContent={<Users2Icon size={15} />}
                    href={`vacancies/${vacancy.id}/applicants`}
                  >
                    Applicants
                  </MoreAction.Item>
                </MoreAction.Section>

                <MoreAction.Item
                  as={Link}
                  color="danger"
                  className="text-danger"
                  startContent={<TrashIcon size={15} />}
                  href={`?v=delete&id=${vacancy.id}`}
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
