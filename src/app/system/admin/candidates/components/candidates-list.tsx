"use client";

import { GridPaginateMeta } from "@/lib/shared/types";
import React from "react";
import { ListCandidate } from "../_lib/schema";
import DataGrid from "@/app/system/components/datagrid/grid";

type CandidatesListProps = {
  meta: GridPaginateMeta;
  candidates: ListCandidate[];
};

export default function CandidatesList({
  meta,
  candidates,
}: CandidatesListProps) {
  return (
    <DataGrid
      meta={meta}
      data={candidates}
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
          header: "Job",
          accessorKey: "job",
        },
        // {
        //   id: "action",
        //   cell({ row: { original: user } }) {
        //     return (
        //       <MoreAction>
        //         <MoreAction.Item as={Link} className="text-foreground">
        //           Change status
        //         </MoreAction.Item>
        //         <MoreAction.Item
        //           as={Link}
        //           color="warning"
        //           className="text-warning"
        //         >
        //           Reset password
        //         </MoreAction.Item>
        //       </MoreAction>
        //     );
        //   },
        // },
      ]}
    />
  );
}
