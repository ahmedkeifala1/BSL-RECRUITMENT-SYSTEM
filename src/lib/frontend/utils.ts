import {
  GridPaginateMeta,
  PaginatedParams,
  PaginationParams,
} from "../shared/types";

export function getPaginatedParams<T extends object>(
  params: PaginationParams<T>,
  defaultValue?: T
): PaginatedParams<T> {
  const res = {
    ...defaultValue,
    ...params,
    l: params.l ?? 10,
    p: params.p ?? 1,
  };

  return {
    ...res,
    skip: (res.p - 1) * res.l,
    order: res?.o ? { [res.o as string]: res.om ?? "asc" } : undefined,
  };
}

export function getShowingRecordsText({ l, skip, total }: GridPaginateMeta) {
  const start = skip + 1;
  const end = Math.min(skip + l, total);

  return `Showing ${start} to ${end} of ${total} records`;
}

export function numberToSelectItemArray(
  length: number,
  prefix?: string,
  suffix?: string
) {
  return Array.from({ length }).map((_, i) => ({
    key: i + 1,
    value: `${prefix ?? ""} ${i + 1} ${suffix ?? ""}`.trim(),
  }));
}

export function toFormData<T extends object>(data: T) {
  const form = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    form.append(key, value);
  });

  return form;
}

export function fromFormData<T extends object>(form: FormData) {
  const data = Object.fromEntries(form.entries());

  return data as T;
}
