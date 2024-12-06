"use client";

import { Drop } from "@/lib/shared/types";
import {
  Select,
  SelectItem,
  SelectProps,
  SharedSelection,
} from "@nextui-org/react";
import { useMemo } from "react";

type SelectItemFieldProps<T> = {
  prefix?: string;
  suffix?: string;
  source: number | object;
  props?: Drop<SelectProps, "children" | "items">;
  setSelected?: (item: SelectItem<T>) => void;
};

export type SelectItem<T> = {
  key: T;
  value: string | number;
};

export function SelectItemField<T>({
  source,
  prefix,
  suffix,
  props,
  setSelected,
}: SelectItemFieldProps<T>) {
  const items = useMemo(() => {
    let arr: string[] = [];
    if (typeof source === "number") {
      arr = Array.from({ length: source }).map((_, i) => i.toString());
    } else {
      arr = Object.keys(source).map((k) => k.toString());
    }

    return arr.map<SelectItem<T>>((k) => ({
      key: k as unknown as T,
      value: `${prefix ?? ""}${k.replaceAll("_", " ")}${suffix ?? ""}`,
    }));
  }, [source, prefix, suffix]);

  function handleSelectionChanged(keys: SharedSelection) {
    if (setSelected) {
      const key = new Set(keys).values().next().value;
      const item = items.find((item) => item.key === key);

      if (item) {
        setSelected(item);
      }
    }
  }

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
      onSelectionChange={handleSelectionChanged}
    >
      {(item) => (
        <SelectItem
          key={item.key as string}
          value={item.key as string}
          textValue={item.value.toString()}
        >
          {item.value}
        </SelectItem>
      )}
    </Select>
  );
}
