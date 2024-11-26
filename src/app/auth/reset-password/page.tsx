import Navbar from "@/components/navbar";
import { verifyJwt } from "@/lib/core/utils";
import { Link } from "@nextui-org/react";
import React from "react";
import ResetPasswordForm from "./components/reset-password-form";
import { redirect } from "next/navigation";
import { CookieToken } from "../verify-otp/_lib/schemas";

type ResetPasswordPageProps = {
  searchParams: { tk: string };
};

export default function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const token = verifyJwt<CookieToken>(searchParams.tk);

  if (!token || !token.receiver || token.purpose !== "Reset Password") {
    return redirect("/auth/forgot-password");
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

      <main className="flex-1 md:bg-zinc-50 flex flex-col md:justify-center items-center py-6">
        <div className="container md:max-w-xl space-y-2 md:shadow md:border bg-white p-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Reset your password</h1>
            <p className="text-slate-600 text-sm">
              Create a new password for your account (
              <em className="font-semibold">{token?.receiver}</em>)
            </p>
          </header>

          <ResetPasswordForm email={token.receiver} />

          <p className="text-sm">
            Remembered your password?{" "}
            <Link href="/auth" size="sm">
              Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
