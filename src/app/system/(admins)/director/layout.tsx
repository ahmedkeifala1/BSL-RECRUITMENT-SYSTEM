import React from "react";
import { getLoggedAdmin } from "../_lib/actions";
import { redirect } from "next/navigation";

export default async function DirectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getLoggedAdmin();

  if (admin.data?.role !== "Director") {
    return redirect("/auth/gateway");
  }

  return children;
}
