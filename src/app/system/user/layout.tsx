import React, { ReactNode } from "react";

import { getAuthJobSeeker } from "./_lib/actions";
import { getResponseData } from "@/lib/shared/utils";
import getRoutes from "../_lib/routes";
import AuthJobSeekerProvider from "./provider";
import Unauthorised from "../components/unauthorised";
import ToolBar from "../components/toolbar";

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const auth = await getAuthJobSeeker();

  if (!auth.data || auth.isFailure) {
    return <Unauthorised message={auth.message} />;
  }

  const routes = getRoutes("User");

  return (
    <>
      <ToolBar routes={routes} baseUrl={`/system/user`} />

      <AuthJobSeekerProvider jobSeeker={getResponseData(auth)}>
        {children}
      </AuthJobSeekerProvider>
    </>
  );
}
