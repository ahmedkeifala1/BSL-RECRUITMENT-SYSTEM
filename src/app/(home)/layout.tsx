import Loader from "@/components/loader";
import SiteFooter from "@/components/site/footer";
import SiteNavbar from "@/components/site/navbar";
import React, { Suspense } from "react";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNavbar />

      <Suspense fallback={<Loader />}>{children}</Suspense>

      <SiteFooter />
    </>
  );
}
