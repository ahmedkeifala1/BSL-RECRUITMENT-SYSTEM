import React from "react";
import { getLoggedAdmin } from "../_lib/actions";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getLoggedAdmin();

  if (admin.data?.role !== "Admin") {
    return redirect("/auth/gateway");
  }

  return children;
}
