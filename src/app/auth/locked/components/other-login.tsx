"use client";

import { Link } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import React from "react";

export default function LoginWithOtherAccountButton() {
  return (
    <Link
      className="font-semibold"
      onPress={() =>
        signOut({
          redirect: true,
        })
      }
      href="/auth"
    >
      Login with another account
    </Link>
  );
}
