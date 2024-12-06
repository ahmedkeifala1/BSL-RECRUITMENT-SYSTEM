export type Drop<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type PaginationParams<T extends object = { q: "" }> = T & {
  l: number;
  p: number;
  q?: string;
  o?: string;
  om?: "desc" | "asc";
};

export type ListProps<T extends object = object> = {
  searchParams: PaginationParams<T>;
};

export type PaginatedParams<T extends object = { skip: 0 }> =
  PaginationParams<T> & {
    skip: number;
    order?: { [key: string]: string };
  };

export type GridPaginateMeta = PaginationParams<{
  skip: number;
  total: number;
}>;
