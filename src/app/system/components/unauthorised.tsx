"use client";

import { IconButton } from "@/components/custom";
import { Link } from "@nextui-org/react";
import { LockIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

export default function Unauthorised({ message }: { message?: string }) {
  return (
    <main className="min-h-screen container p-6 sm:px-0 flex justify-center items-center flex-col gap-4">
      <div className="flex flex-col items-center">
        <LockIcon size={90} className="text-red-400" />
        <code className="text-red-400 text-xl font-extrabold">{message}</code>
      </div>
      <p className="text-slate-700 max-w-lg text-center">
        You do not have permission to access this page. If you believe this is
        an error, please contact support.
      </p>

      <div className="flex gap-3">
        <IconButton
          as={Link}
          href="/"
          variant="solid"
          isIconOnly={false}
          className="font-semibold"
        >
          Return home
        </IconButton>

        <IconButton
          as={Link}
          href="/auth"
          color="warning"
          variant="solid"
          isIconOnly={false}
          className="font-semibold"
          onPress={() => signOut({ redirect: true })}
        >
          Login again
        </IconButton>
      </div>
    </main>
  );
}
