import React, { ReactNode } from "react";

import { getAuthStaff } from "./_lib/actions";
import { getResponseData } from "@/lib/shared/utils";
import getRoutes from "../_lib/routes";
import AuthJobSeekerProvider from "./provider";
import Unauthorised from "../components/unauthorised";
import ToolBar from "../components/toolbar";
import { getAuthJobSeeker } from "../user/_lib/actions";
import ActivateAsJobSeeker from "./components/activate-as-jobseeker";

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const auth = await getAuthStaff();

  if (!auth.data || auth.isFailure) {
    return <Unauthorised message={auth.message} />;
  }

  const routes = getRoutes("Staff");
  const jobSeekerData = await getAuthJobSeeker(auth.data.email);
  if (!jobSeekerData.data || jobSeekerData.isFailure) {
    return <ActivateAsJobSeeker staff={getResponseData(auth)} />;
  }

  const jobSeeker = getResponseData(jobSeekerData);

  return (
    <>
      <ToolBar routes={routes} baseUrl={`/system/staff`} />

      <AuthJobSeekerProvider jobSeeker={jobSeeker}>
        {children}
      </AuthJobSeekerProvider>
    </>
  );
}
