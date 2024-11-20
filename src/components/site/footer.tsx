"use client";

import { Divider, Link } from "@nextui-org/react";
import React from "react";
import Logo from "../logo";

export default function SiteFooter() {
  const links = [
    {
      href: "/jobs?q=latest",
      text: "Top Jobs",
    },
    {
      href: "/jobs?q=popular",
      text: "Popular Jobs",
    },
    {
      href: "/jobs",
      text: "View All Jobs",
    },
  ];

  return (
    <footer className="mt-auto px-4 py-2 shadow-sm bg-yellow-600 space-y-4">
      <div className="flex gap-4 flex-wrap justify-between items-center">
        <div className="flex gap-3">
          <Logo width={56} height={56} />
          <div className="leading">
            <p className="text-white font-bold text-lg">Job Portal</p>
            <p className="text-white">Bank of Sierra Leone</p>
          </div>
        </div>
        <div className="text-white">
          <p className="font-semibold">Quick Links</p>
          <div className="space-x-3">
            {links.map((link, i) => (
              <Link
                href={link.href}
                key={`link_${i}`}
                underline="hover"
                className="text-inherit"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Divider />
      <p className="text-center text-slate-100">
        &copy; {new Date().getFullYear()} Job at the Bank of Sierra Leone
      </p>
    </footer>
  );
}
