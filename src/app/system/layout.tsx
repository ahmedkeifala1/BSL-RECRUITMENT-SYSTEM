import AppBar from "@/components/navbar";
import React, { Suspense } from "react";
import { getLoggedUser } from "../auth/_lib/actions";
import { getResponseData } from "@/lib/shared/utils";
import { redirect } from "next/navigation";
import UserDropdown from "./components/user-dropdown";
import Loader from "@/components/loader";
import NotificationBell from "./components/notifications/notification-bell";

export default async function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logged = await getLoggedUser();

  if (!logged.data || logged.isFailure) {
    switch (logged.code) {
      case 403:
        return redirect("/auth/verify-email");
      case 423:
        return redirect("/auth/locked");
      case 401:
      default:
        return redirect("/auth");
    }
  }
  const user = getResponseData(logged);

  return (
    <>
      <AppBar
        brandName={user.userType === "User" ? "Job Seeker" : user.userType}
      >
        <div className="flex items-center gap-2">
          <NotificationBell />
          <UserDropdown user={user} />
        </div>
      </AppBar>

      <Suspense fallback={<Loader message="Routing...." />}>
        {children}
      </Suspense>
    </>
  );
}
