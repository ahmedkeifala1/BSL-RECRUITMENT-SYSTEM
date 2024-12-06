"use client";

import ConfirmModal from "@/app/system/components/confirm-modal";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import React from "react";
import { toast } from "react-toastify";
import { removeDocument } from "../../_lib/actions";

export default function RemoveDocument() {
  const { route, searchParams } = useNavigation();

  async function handleDelete() {
    const res = await removeDocument({
      id: searchParams.get("remove") as string,
    });

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    searchParams.has("remove") && (
      <ConfirmModal
        entity="Document"
        action="Remove"
        actionFn={handleDelete}
        onHide={() => route()}
        show={searchParams.has("remove")}
      />
    )
  );
}
