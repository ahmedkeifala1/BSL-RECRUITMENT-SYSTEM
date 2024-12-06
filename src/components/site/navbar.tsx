import { Link } from "@nextui-org/react";
import React from "react";
import AppBar from "../navbar";
import { getLoggedUser } from "@/app/auth/_lib/actions";
import UserDropdown from "@/app/system/components/user-dropdown";
import RegisterButton from "./register-button";
import { getResponseData } from "@/lib/shared/utils";

export default async function SiteNavbar() {
  const userData = await getLoggedUser();
  const user = getResponseData(userData);

  return (
    <AppBar>
      {userData.data ? (
        <UserDropdown
          user={userData.data}
          routes={[
            {
              title: "Dashboard",
              icon: "HomeIcon",
              href: `/system/${user.userType?.toLowerCase()}`,
            },
          ]}
        />
      ) : (
        <>
          <Link href="/auth" className="text-primary font-semibold">
            Login
          </Link>
          <RegisterButton />
        </>
      )}
    </AppBar>
  );
}
