"use client";

import ConfirmModal from "@/app/system/components/confirm-modal";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import React from "react";
import { toast } from "react-toastify";
import { deleteVacancy } from "../../_lib/actions";

export default function DeleteVacancy() {
  const { route, searchParams } = useNavigation();

  async function handleDelete() {
    const res = await deleteVacancy({ id: searchParams.get("id") as string });

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    <ConfirmModal
      entity="Vacancy"
      action="Delete"
      actionFn={handleDelete}
      onHide={() => route()}
      show={searchParams.has("id") && searchParams.get("v") === "delete"}
    />
  );
}
