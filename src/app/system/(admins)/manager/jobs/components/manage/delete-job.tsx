"use client";

import ConfirmModal from "@/app/system/components/confirm-modal";
import useNavigation from "@/lib/hooks/navigation-hook";
import React from "react";
import { toast } from "react-toastify";
import { deleteJob } from "../../_lib/actions";

export default function DeleteJob() {
  const { route, searchParams } = useNavigation();

  async function handleDelete() {
    const res = await deleteJob({ id: searchParams.get("id") as string });

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    <ConfirmModal
      entity="Job"
      action="Delete"
      actionFn={handleDelete}
      onHide={() => route()}
      show={searchParams.has("id") && searchParams.get("v") === "delete"}
    />
  );
}
