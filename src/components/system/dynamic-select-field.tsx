"use client";

import {
  Select,
  SelectItem,
  SelectProps,
  SharedSelection,
} from "@nextui-org/react";
import { Prisma } from "@prisma/client";
import React, { PropsWithChildren } from "react";
import Response from "@/lib/base/response";
import { Drop } from "@/lib/core/types";
import { useQuery } from "@tanstack/react-query";
import { getResponseData } from "@/lib/core/functions";
import Placeholder from "../placeholder";
import Database from "@/lib/core/db-context";

export type SelectObject<T extends object = object> = T & {
  id: string | number;
  name: string;
};

type PrismaKey = keyof typeof Database;
type PrismaModel<P extends PrismaKey> = (typeof Database)[P];
type Params<P extends PrismaKey> = Drop<
  Prisma.Args<PrismaModel<P>, "findMany">,
  "select" | "include"
>;

export type ISelectDynamicProps<
  P extends PrismaKey,
  T extends object = object
> = {
  shouldRun?: boolean;
  setSelected?: (item: SelectObject<T>) => void;
  props?: Drop<SelectProps, "children" | "items">;
  params?: Params<P>;
};

type SelectDynamicFieldProps<
  P extends PrismaKey,
  T extends object = object
> = PropsWithChildren &
  ISelectDynamicProps<P, T> & {
    queryKey: string | string[];
    render?: (item: SelectObject<T>) => JSX.Element;
    queryFn: (
      params?: Params<P>
    ) => Promise<Response<SelectObject<T>[] | null>>;
  };

export default function DynamicSelectField<
  P extends PrismaKey,
  T extends object = object
>({
  params,
  render,
  queryKey,
  queryFn,
  props,
  shouldRun,
  children,
  setSelected,
}: Readonly<SelectDynamicFieldProps<P, T>>) {
  const enabled = shouldRun === undefined ? true : shouldRun;
  const query_key = queryKey instanceof Array ? queryKey : [queryKey];

  const { data, isFetching } = useQuery({
    enabled,
    queryKey: [...query_key],
    queryFn: () => queryFn(params),
  });

  const items = getResponseData(data, []);

  function handleSelect(keys: SharedSelection) {
    if (setSelected) {
      const key = new Set(keys).values().next().value;
      const item = items.find((item) => (item as SelectObject).id === key);

      setSelected(item as SelectObject<T>);
    }
  }

  return (
    <Placeholder condition={isFetching}>
      <Select
        size="sm"
        radius="sm"
        variant="bordered"
        {...props}
        items={items}
        isLoading={isFetching}
        isInvalid={
          data?.isFailure || (items.length < 1 && enabled) || props?.isInvalid
        }
        errorMessage={
          data?.isFailure
            ? data.message
            : enabled
            ? props?.errorMessage || "No matching data found"
            : undefined
        }
        onSelectionChange={handleSelect}
      >
        {(item: SelectObject<T>) => {
          if (render) {
            return render(item);
          }

          const select_object = item as SelectObject;

          return (
            <SelectItem
              key={select_object.id}
              value={select_object.id}
              textValue={select_object.name}
            >
              {select_object.name}
            </SelectItem>
          );
        }}
      </Select>

      {children ? children : <></>}
    </Placeholder>
  );
}
