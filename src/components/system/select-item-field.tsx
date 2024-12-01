"use client";

import { Drop } from "@/lib/core/types";
import { Select, SelectItem, SelectProps } from "@nextui-org/react";
import { useMemo } from "react";

type SelectItemFieldProps = {
  source: number | object;
  prefix?: string;
  suffix?: string;
  props?: Drop<SelectProps, "children" | "items">;
};

export function SelectItemField({
  source,
  prefix,
  suffix,
  props,
}: SelectItemFieldProps) {
  const items = useMemo(() => {
    let arr: string[] = [];
    if (typeof source === "number") {
      arr = Array.from({ length: source }).map((_, i) => i.toString());
    } else {
      arr = Object.keys(source).map((k) => k.toString());
    }

    return arr.map((k) => ({
      key: k,
      value: `${prefix ?? ""}${k.replaceAll("_", " ")}${suffix ?? ""}`,
    }));
  }, [source, prefix, suffix]);

  return (
    <Select
      size="sm"
      radius="none"
      variant="bordered"
      {...props}
      items={items}
      classNames={{
        popoverContent: "rounded-none",
      }}
    >
      {(item) => (
        <SelectItem key={item.key} value={item.key} textValue={item.value}>
          {item.value}
        </SelectItem>
      )}
    </Select>
  );
}
