import React from "react";
import VerifyOtpForm from "./components/verify-otp-form";
import Navbar from "@/components/navbar";
import { Link } from "@nextui-org/react";
import { redirect } from "next/navigation";
import CookieOtpRepo from "./_lib/repo";
import ResendTokenLink from "./components/resend-token-link";

export default async function VerifyOtpPage() {
  const cookieToken = await CookieOtpRepo.getCookieToken();

  if (!cookieToken.data || cookieToken.isFailure) {
    return redirect("/auth");
  }
  const otp = cookieToken.data;

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
            <h1 className="text-3xl font-bold">We sent you a code</h1>
            <p className="text-slate-600 text-sm">
              We have sent you a 6 digits code to{" "}
              <em className="font-semibold">{otp?.receiver}</em>. <br /> Enter
              the code to {otp?.purpose?.toLowerCase()}
            </p>
          </header>

          {!otp ? (
            <>
              It seems your token has expired. Click resend token to get a new
              one
            </>
          ) : (
            <VerifyOtpForm />
          )}

          <p className="text-sm">
            Did not receive <abbr title="One Time Password">OTP</abbr>?{" "}
            <ResendTokenLink receiver={otp.receiver} />
          </p>
        </div>
      </main>
    </>
  );
}
