"use client";

import ConfirmModal from "@/app/system/components/confirm-modal";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import React from "react";
import { toast } from "react-toastify";
import { deleteAdmin } from "../_lib/actions";

export default function DeleteAdmin() {
  const { route, searchParams } = useNavigation();

  async function handleDelete() {
    const res = await deleteAdmin({ id: searchParams.get("id") as string });

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    searchParams.get("v") === "delete" && (
      <ConfirmModal
        entity="Admin"
        action="Delete"
        actionFn={handleDelete}
        onHide={() => route()}
        show={searchParams.has("id") && searchParams.get("v") === "delete"}
      />
    )
  );
}
