"use client";

import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getStaff, updateStaff } from "../../_lib/actions";
import StaffModal from "../staff-modal";
import DataLoader from "@/app/system/components/data-loader";
import { toast } from "react-toastify";
import { getResponseData } from "@/lib/shared/utils";
import { AddEditStaff } from "../../_lib/schema";

export default function EditStaff() {
  const { route, searchParams } = useNavigation();
  const show = searchParams.has("id") && searchParams.get("v") === "edit";
  const { data, isLoading, isFetching } = useQuery({
    enabled: show,
    queryKey: ["edit-staff", searchParams.get("id")],
    queryFn: () => getStaff({ id: searchParams.get("id") as string }),
  });

  const staff = getResponseData(data);

  async function onSubmit(data: AddEditStaff) {
    const res = await updateStaff({ id: staff.id }, data);

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    show &&
    staff && (
      <DataLoader response={data} isProcessing={isLoading || isFetching}>
        <StaffModal
          verb="Edit"
          defaultValues={{
            ...staff,
            middleName: staff.middleName || undefined,
          }}
          onSubmit={onSubmit}
        />
      </DataLoader>
    )
  );
}
