"use client";

import {
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { ReactElement } from "react";
import EmptyContent from "./empty";
import Paging from "./paging";
import { GridPaginateMeta } from "@/lib/shared/types";

type DataGridProps<T> = {
  data: T[];
  isFetching?: boolean;
  meta: GridPaginateMeta;
  columns: ColumnDef<T>[];
  selectionMode?: "single" | "multiple";
  onRowSelected?: (selectedRows: T[]) => void;
  onRowSelectChildren?: ReactElement | ReactElement[];
};

export default function DataGrid<T>({
  data,
  meta,
  columns,
  isFetching,
  onRowSelected,
  onRowSelectChildren,
  selectionMode,
}: Readonly<DataGridProps<T>>) {
  const table = useReactTable({
    data,
    columns: columns,
    rowCount: meta.l,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    pageCount: Math.ceil(meta.total / meta.l),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const has_selection = table.getSelectedRowModel().rows.length > 1;

  function handleRowSelectionChange(keys: Selection) {
    const selectedIndexes = new Set(keys);
    const rows = table.getRowModel().rows;
    const isAll = keys === "all" || selectedIndexes.size === rows.length;
    const selectedRows = rows.filter(
      (row) => isAll || selectedIndexes.has(row.id)
    );
    rows.forEach((row) =>
      row.toggleSelected(isAll || selectedIndexes.has(row.id))
    );

    if (onRowSelected) {
      onRowSelected(selectedRows.map((row) => row.original));
    }
  }

  return (
    <>
      <Table
        border={1}
        fullWidth={true}
        removeWrapper={true}
        selectionMode={selectionMode}
        className="w-full overflow-x-auto"
        classNames={{
          td: "!rounded-none border-b",
          th: "!rounded-none text-sm text-gray-700",
        }}
        aria-labelledby="table"
        onSelectionChange={handleRowSelectionChange}
        topContent={has_selection ? onRowSelectChildren : undefined}
      >
        <TableHeader
          columns={table
            .getHeaderGroups()[0]
            .headers.filter((c) => !c.isPlaceholder)}
        >
          {(column) => (
            <TableColumn key={column.id}>
              {flexRender(column.column.columnDef.header, column.getContext())}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody
          isLoading={isFetching}
          items={table.getRowModel().rows}
          emptyContent={
            <EmptyContent
              isQueried={!!meta.q}
              message={
                meta.q
                  ? `No matching record found for ${meta.q}`
                  : "No record created! Try creating one"
              }
            />
          }
        >
          {(row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {table.getPageCount() < 2 ? undefined : (
        <Paging meta={meta} pageCount={table.getPageCount()} />
      )}
    </>
  );
}
