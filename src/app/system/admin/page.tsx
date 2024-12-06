import React, { lazy } from "react";
import { getLoggedAdmin } from "./_lib/actions";
import Unauthorised from "../components/unauthorised";

const dashboards = {
  Admin: lazy(() => import(`./components/dashboards/admin/dashboard`)),
  Manager: lazy(() => import(`./components/dashboards/manager/dashboard`)),
  Director: lazy(() => import(`./components/dashboards/director/dashboard`)),
};

export default async function Dashboard() {
  const logged = await getLoggedAdmin();
  if (!logged.data || logged.isFailure) {
    return <Unauthorised message={logged.message} />;
  }

  const Dashboard = dashboards[logged.data.role];

  return <Dashboard />;
}
