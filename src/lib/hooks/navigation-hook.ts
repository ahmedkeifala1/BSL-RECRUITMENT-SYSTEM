import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type NavPath = {
  key: string;
  value?: string;
};

export type NavPathClear =
  | string
  | (NavPath & {
      action?: "delete" | "set";
    })[];

export default function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function route(params?: URLSearchParams) {
    if (!params) {
      return router.replace(pathname);
    }
    return router.replace(`${pathname}?${params.toString()}`);
  }

  function clear(setKeys?: NavPathClear, getParams?: boolean) {
    let params = new URLSearchParams();

    if (setKeys && setKeys !== "*") {
      params = new URLSearchParams(searchParams);

      if (typeof setKeys !== "string") {
        setKeys.forEach((key) =>
          key.action === "delete"
            ? params.delete(key.key)
            : params.set(key.key, key.value ?? "")
        );
      } else if (setKeys !== "*") {
        params.delete(setKeys);
      }
    }

    return getParams ? params : route(setKeys !== "*" ? params : undefined);
  }

  function navigate(navs: NavPath[], setKeys?: NavPathClear) {
    const params = clear(setKeys, true) as URLSearchParams;

    navs.forEach((nav) => {
      if (nav.value && nav.value.length > 0) {
        params.set(nav.key, nav.value);
      } else {
        params.delete(nav.key);
      }
    });

    return router.replace(`${pathname}?${params.toString()}`);
  }

  return { route, clear, navigate, pathname, searchParams, ...router };
}
