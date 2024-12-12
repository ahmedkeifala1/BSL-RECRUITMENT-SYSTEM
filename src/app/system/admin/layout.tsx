import React, { ReactNode } from "react";
import AdminProvider from "./provider";
import { getLoggedAdmin } from "./_lib/actions";
import getRoutes from "../_lib/routes";
import { getResponseData } from "@/lib/shared/utils";
import { getPathname } from "@/lib/backend/utils";
import Unauthorised from "../components/unauthorised";
import ToolBar from "../components/toolbar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const logged = await getLoggedAdmin();

  if (!logged.data || logged.isFailure) {
    return <Unauthorised message={logged.message} />;
  }

  const admin = getResponseData(logged);
  const routes = getRoutes(admin.role);
  let pathname = getPathname();

  if (pathname.indexOf("/system/admin") > -1) {
    pathname = pathname.replace("/system/admin", "");
  } else {
    pathname = "";
  }

  const isAuth =
    pathname.length < 1 ||
    routes.some((route) => pathname.startsWith(route.href));

  if (!isAuth) {
    return <Unauthorised message="Unauthorised" />;
  }

  return (
    <>
      <ToolBar routes={routes} baseUrl={`/system/admin`} />

      <main className="container flex-1 p-6 sm:px-0">
        <AdminProvider admin={admin}>{children}</AdminProvider>
      </main>
    </>
  );
}
