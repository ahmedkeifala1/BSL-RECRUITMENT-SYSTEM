"use client";

import ConfirmModal from "@/app/system/components/confirm-modal";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import React from "react";
import { toast } from "react-toastify";
import { removeStaff } from "../../_lib/actions";

export default function RemoveStaff() {
  const { route, searchParams } = useNavigation();

  async function handleDelete() {
    const res = await removeStaff({ id: searchParams.get("id") as string });

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    searchParams.has("remove") && (
      <ConfirmModal
        entity="Staff"
        action="Delete"
        actionFn={handleDelete}
        onHide={() => route()}
        show={searchParams.has("id") && searchParams.get("v") === "remove"}
      />
    )
  );
}
