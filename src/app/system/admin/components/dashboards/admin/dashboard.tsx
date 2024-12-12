import { getResponseData } from "@/lib/shared/utils";
import React from "react";
import { getLoggedUser } from "@/app/auth/_lib/actions";
import DashboardComponent from "../../dashboard";

export default async function AdminDashboard() {
  const admin = getResponseData(await getLoggedUser());

  return <DashboardComponent user={admin} role="Admin" />;
}
