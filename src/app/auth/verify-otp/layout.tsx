import Loader from "@/components/loader";
import React, { Suspense } from "react";

export default function VerifyOtpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loader message="Processing" />}>{children}</Suspense>
  );
}
