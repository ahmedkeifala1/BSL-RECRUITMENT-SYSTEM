"use client";

import React from "react";
import { addStaff } from "../../_lib/actions";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import { toast } from "react-toastify";
import StaffModal from "../staff-modal";
import { AddEditStaff } from "../../_lib/schema";

export default function AddStaff() {
  const { route, searchParams } = useNavigation();

  async function onSubmit(data: AddEditStaff) {
    const res = await addStaff(data);

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    searchParams.get("v") === "create" && (
      <StaffModal onSubmit={onSubmit} verb="Create" />
    )
  );
}
