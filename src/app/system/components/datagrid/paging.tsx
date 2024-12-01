"use client";

import { Drop, GridPaginateMeta } from "@/lib/core/types";
import { getShowingRecordsText } from "@/lib/core/functions";
import { Pagination, PaginationProps } from "@nextui-org/react";
import React from "react";
import useNavigation from "@/lib/hooks/navigation-hook";

type PagingProps = {
  pageCount: number;
  meta: GridPaginateMeta;
  paginationProps?: Drop<PaginationProps, "onChange" | "children">;
};

export default function Paging({
  meta,
  pageCount,
  paginationProps,
}: Readonly<PagingProps>) {
  const { navigate } = useNavigation();

  return (
    <div className="flex border-t pt-4 flex-col sm:flex-row items-center justify-end sm:px-4 flex-wrap gap-2">
      <p className="text-sm font-semibold text-slate-600">
        {getShowingRecordsText(meta)}
      </p>

      <Pagination
        size="sm"
        radius="sm"
        page={meta.p}
        variant="flat"
        showControls={true}
        total={pageCount}
        {...paginationProps}
        onChange={(page) =>
          navigate([
            { key: "p", value: page > 1 ? page.toString() : undefined },
          ])
        }
      />
    </div>
  );
}
