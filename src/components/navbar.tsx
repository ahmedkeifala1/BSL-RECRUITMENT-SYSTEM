"use client";

import { Link } from "@nextui-org/react";
import React, { PropsWithChildren } from "react";
import Logo from "./logo";

type NavbarProps = PropsWithChildren & {
  className?: string;
};

export default function Navbar({ children, className }: NavbarProps) {
  return (
    <div
      className={`bg-yellow-500 ${className} w-full flex justify-between shadow`}
    >
      <div className="bg-white max-w-fit py-2 px-4 leading-3 rounded-e-lg hover:ps-5 duration-100">
        <Link href="/" className="flex gap-2" tabIndex={-1}>
          <Logo width={32} height={32} />
          <p className="font-bold text-inherit text-lg sm:text-xl">
            Jobs Portal
          </p>
        </Link>
      </div>

      <div className="px-4 py-2 flex-1 flex justify-end gap-4">{children}</div>
    </div>
  );
}
