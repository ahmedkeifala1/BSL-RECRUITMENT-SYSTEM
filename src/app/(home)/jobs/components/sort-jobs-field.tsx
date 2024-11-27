"use client";

import { SelectField } from "@/components/custom";
import { SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function SortJobsField() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  function handleSortChange(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value.length > 0) {
      params.set("o", value);
    } else {
      params.delete("o");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <SelectField
      label="Sort by"
      labelPlacement="outside-left"
      defaultSelectedKeys={[searchParams.get("o") || "newest"]}
      selectionMode="single"
      className="flex-1 sm:max-w-[12rem] items-center"
      fullWidth={false}
      classNames={{
        label: "min-w-fit text-base",
        popoverContent: "rounded-none border border-gray-200",
      }}
      onChange={({ target: { value } }) => handleSortChange(value)}
    >
      <SelectItem key="newest" value="newest" textValue="Most Recent">
        Most Recent
      </SelectItem>
      <SelectItem key="oldest" value="oldest" textValue="Less Recent">
        Less Recent
      </SelectItem>
    </SelectField>
  );
}
