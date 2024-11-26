import React from "react";
import { getLoggedUser } from "../_lib/actions";
import { redirect } from "next/navigation";
import { Link } from "@nextui-org/react";
import LoginWithOtherAccountButton from "./components/other-login";
import Navbar from "@/components/navbar";

export default async function AccountLocked() {
  const logged = await getLoggedUser();

  if (logged.code !== 423) {
    return redirect("/auth/gateway");
  }

  return (
    <>
      <Navbar className="!bg-white items-center">
        <p className="text-sm font-semibold text-slate-600">
          Need help?{" "}
          <Link size="sm" href="/help" className="text-blue-500 font-semibold">
            Contact us
          </Link>
        </p>
      </Navbar>

      <main className="flex-1 flex justify-center items-center">
        <div className="container max-w-sm space-y-2">
          <header className="mb-4">
            <h1 className="text-3xl font-bold">OOPS!</h1>
            <p className="text-slate-600 text-sm">
              Access to your account has been denied with the following message
            </p>
          </header>

          <div className="bg-red-100 p-3">
            <p className="font-bold text-red-500 text-xl text-center">
              {logged.message}
            </p>
          </div>

          <p>
            To regain access, follow the contact support or try{" "}
            <LoginWithOtherAccountButton />.
          </p>
        </div>
      </main>
    </>
  );
}
