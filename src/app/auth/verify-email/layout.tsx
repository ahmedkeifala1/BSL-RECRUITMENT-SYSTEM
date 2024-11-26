import Loader from "@/components/loader";
import React, { Suspense } from "react";

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      name="Verify email"
      fallback={<Loader message="Sending verification OTP" />}
    >
      {children}
    </Suspense>
  );
}
