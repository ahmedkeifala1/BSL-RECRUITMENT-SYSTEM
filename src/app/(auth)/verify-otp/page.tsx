import { verifyOtp } from "@/lib/core/utils";
import { cookies } from "next/headers";
import React from "react";
import VerifyOtpForm from "./form";
import Navbar from "@/components/navbar";
import { Link } from "@nextui-org/react";
import ResendTokenLink from "./resend-token";
import { Code2Icon } from "lucide-react";

export default function VerifyOTPPage() {
  const otp = verifyOtp(cookies().get("token")?.value as string);

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

      <main className="flex-1 flex flex-col md:justify-center items-center py-6">
        <div className="container flex flex-col items-center md:max-w-xl space-y-2 p-6">
          {!otp ? (
            <div className="text-center flex flex-col items-center">
              <Code2Icon className="text-red-400" size={96} />
              <p className="text-lg font-bold">Invalid or expired token</p>
              <p className="text-sm">
                The token you are trying to use is either invalid or has
                expired. Please return to previous screen to get a new token.
              </p>
            </div>
          ) : (
            <>
              <header className="mb-8 text-center space-y-2">
                <h1 className="text-3xl font-bold">Verify OTP</h1>
                <p className="text-slate-600">
                  Enter the OTP sent to:{" "}
                  <em className="text-slate-800 font-semibold">
                    {otp.receiver}
                  </em>
                </p>
              </header>

              <VerifyOtpForm />

              <p className="text-sm">
                Didn&apos;t receive the OTP?{" "}
                <ResendTokenLink receiver={otp.receiver} />
              </p>
            </>
          )}
        </div>
      </main>
    </>
  );
}
