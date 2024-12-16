import { getLoggedUser } from "@/app/auth/_lib/actions";
import { getResponseData } from "@/lib/shared/utils";
import React from "react";
import DashboardComponent from "../../dashboard";

export default async function ManagerDashboard() {
  const admin = getResponseData(await getLoggedUser());

  return <DashboardComponent user={admin} role="Manager" />;
}
