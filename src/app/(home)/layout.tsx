import SiteFooter from "@/components/site/footer";
import SiteNavbar from "@/components/site/navbar";
import React from "react";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNavbar />

      <main>{children}</main>

      <SiteFooter />
    </>
  );
}
