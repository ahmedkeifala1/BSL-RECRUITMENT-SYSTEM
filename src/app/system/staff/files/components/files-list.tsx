"use client";

import React from "react";
import { JobSeekerDocumentDetail } from "../../_lib/schema";
import { GridPaginateMeta } from "@/lib/shared/types";
import DocumentIcon from "../../../components/document-icon";
import { Icon } from "@/lib/frontend/icons";
import { Link } from "@nextui-org/react";
import DataGrid from "@/app/system/components/datagrid/grid";
import MoreAction from "@/app/system/components/datagrid/more";

type FilesListProps = {
  meta: GridPaginateMeta;
  files: JobSeekerDocumentDetail[];
};

export default function FilesList({ meta, files }: FilesListProps) {
  return (
    <DataGrid
      data={files}
      meta={meta}
      columns={[
        {
          id: "image",
          cell({ row: { original: document } }) {
            return <DocumentIcon type={document.documentType} />;
          },
        },
        {
          header: "Name",
          accessorKey: "name",
        },
        {
          header: "Type",
          accessorKey: "type",
          cell({ row: { original: document } }) {
            return document.type.replaceAll("_", " ");
          },
        },
        {
          header: "Size",
          accessorKey: "size",
          cell({ row: { original: document } }) {
            return `${(Number(document.size) / 1024).toFixed(
              2
            )} kb`.toUpperCase();
          },
        },
        {
          header: "File type",
          accessorKey: "documentType",
          cell({ row: { original: document } }) {
            return document.documentType.split("/").pop()?.toUpperCase();
          },
        },
        {
          id: "action",
          cell({ row: { original: document } }) {
            return (
              <MoreAction>
                <MoreAction.Item
                  as={Link}
                  href={`?preview=${encodeURI(document.url)}`}
                  startContent={<Icon name="ViewIcon" />}
                >
                  Preview
                </MoreAction.Item>

                <MoreAction.Item
                  color="danger"
                  className="text-danger"
                  as={Link}
                  href={`?remove=${document.id}`}
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
