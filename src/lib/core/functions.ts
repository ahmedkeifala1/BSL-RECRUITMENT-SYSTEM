import Response from "../base/response";
import { GridPaginateMeta } from "./types";

export function getShowingRecordsText({ l, skip, total }: GridPaginateMeta) {
  const start = skip + 1;
  const end = Math.min(skip + l, total);

  return `Showing ${start} to ${end} of ${total} records`;
}

export function getResponseData<T>(res?: Response<T | null>, defaultValue?: T) {
  return res?.data ? res.data : (defaultValue as T);
}

export function pluralise(word: string) {
  if (word.endsWith("y")) {
    return `${word.slice(0, -1)}ies`;
  }

  return `${word}s`;
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
