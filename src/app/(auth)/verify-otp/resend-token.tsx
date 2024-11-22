"use client";

import Link from "next/link";
import React from "react";

export default function ResendTokenLink({ receiver }: { receiver: string }) {
  async function handleResend() {
    console.log("Resending to ", receiver);
  }

  return (
    <Link
      href="/verify-otp"
      onClick={handleResend}
      className="text-blue-500 font-semibold"
      replace={true}
    >
      Resend OTP
    </Link>
  );
}
