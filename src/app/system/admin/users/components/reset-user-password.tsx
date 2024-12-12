"use client";

import ConfirmModal from "@/app/system/components/confirm-modal";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import React from "react";
import { toast } from "react-toastify";
import { resetPassword } from "../_lib/actions";

export default function ResetUserPassword() {
  const { route, searchParams } = useNavigation();

  async function handleReset() {
    const res = await resetPassword({ id: searchParams.get("id") as string });

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    searchParams.get("v") === "reset" && (
      <ConfirmModal
        entity="User"
        action="Password Reset"
        actionFn={handleReset}
        onHide={() => route()}
        show={searchParams.has("id") && searchParams.get("v") === "reset"}
      />
    )
  );
}
