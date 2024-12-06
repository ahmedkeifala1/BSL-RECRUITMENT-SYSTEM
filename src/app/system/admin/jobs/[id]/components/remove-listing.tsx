"use client";

import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import React from "react";
import { removeListing } from "../_lib/actions";
import { toast } from "react-toastify";
import ConfirmModal from "@/app/system/components/confirm-modal";

export default function RemoveListing() {
  const { route, searchParams } = useNavigation();

  async function handleDelete() {
    const res = await removeListing({ id: searchParams.get("id") as string });

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    <ConfirmModal
      action="Remove"
      actionFn={handleDelete}
      onHide={() => route()}
      yesBtnProps={{ title: "Remove" }}
      entity={searchParams.get("remove") as string}
      show={searchParams.has("id") && searchParams.has("remove")}
    />
  );
}
