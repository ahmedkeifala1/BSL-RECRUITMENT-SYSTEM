import { getLoggedUser } from "@/app/auth/_lib/actions";
import Navbar from "@/components/navbar";
import { redirect } from "next/navigation";
import React from "react";
import UserDropdown from "../components/user-dropdown";
import ToolBar from "../components/toolbar";
import GetRoutes from "./_lib/routes";
import { getLoggedAdmin } from "./_lib/actions";
import AdminProvider from "./provider";

export default async function AdminsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logged = await getLoggedUser();

  if (logged.isFailure || !logged.data) {
    return redirect("/auth");
  } else if (logged.data.userType !== "Admin") {
    return redirect("/auth/gateway");
  }

  const admin = await getLoggedAdmin(logged.data.id);

  if (!admin.data || admin.isFailure) {
    return redirect("/auth");
  }

  return (
    <>
      <Navbar className="!bg-white">
        <UserDropdown user={logged.data} />
      </Navbar>

      <ToolBar
        routes={GetRoutes(admin.data.role)}
        baseUrl={`/system/${admin.data.role.toLowerCase()}`}
      />

      <main className="container flex-1 p-6 sm:px-0">
        <AdminProvider admin={admin.data}>{children}</AdminProvider>
      </main>
    </>
  );
}
