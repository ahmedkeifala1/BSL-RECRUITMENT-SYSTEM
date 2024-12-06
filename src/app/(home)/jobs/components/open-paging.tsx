"use client";

import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import { Pagination } from "@nextui-org/react";
import React from "react";

type OpenPagingProps = {
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export default function OpenPaging({ meta }: OpenPagingProps) {
  const { navigate } = useNavigation();

  return (
    <Pagination
      radius="none"
      variant="bordered"
      page={meta.page}
      total={Math.max(1, Math.ceil(meta.total / meta.limit))}
      onChange={(page) => navigate([{ key: "p", value: page.toString() }])}
    />
  );
}
