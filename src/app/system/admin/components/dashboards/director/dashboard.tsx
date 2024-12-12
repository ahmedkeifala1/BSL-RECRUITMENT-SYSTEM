import React from "react";
import DashboardComponent from "../../dashboard";
import { getLoggedUser } from "@/app/auth/_lib/actions";
import { getResponseData } from "@/lib/shared/utils";

export default async function DirectorDashboard() {
  const admin = getResponseData(await getLoggedUser());

  return <DashboardComponent user={admin} role="Director" />;
}
