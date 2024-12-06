"use client";

import { Link, NavbarBrand, NavbarProps } from "@nextui-org/react";
import React from "react";
import Logo from "./logo";
import { Navbar } from "@nextui-org/react";

type AppBarProps = NavbarProps & {
  brandName?: string;
};

export default function AppBar({ children, brandName, ...props }: AppBarProps) {
  return (
    <Navbar {...props} maxWidth="full" isBordered={true}>
      <NavbarBrand as={Link} href="/" className="gap-2 text-yellow-500">
        <Logo width={32} height={32} />
        <p className="font-bold text-inherit text-lg sm:text-xl">
          {brandName ?? "Job Portal"}
        </p>
      </NavbarBrand>

      {children ? children : <></>}
    </Navbar>
  );
}
