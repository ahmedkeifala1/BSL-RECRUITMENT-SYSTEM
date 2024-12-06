"use client";

import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getVacancy, updateVacancy } from "../../_lib/actions";
import { AddEditVacancy } from "../../_lib/schemas";
import VacancyModal from "../vacancy-modal";
import DataLoader from "@/app/system/components/data-loader";
import { toast } from "react-toastify";
import { getResponseData } from "@/lib/shared/utils";

export default function EditVacancy() {
  const { route, searchParams } = useNavigation();
  const show = searchParams.has("id") && searchParams.get("v") === "edit";
  const { data, isLoading, isFetching } = useQuery({
    enabled: show,
    queryKey: ["edit-vacancy", searchParams.get("id")],
    queryFn: () => getVacancy({ id: searchParams.get("id") as string }),
  });

  const vacancy = getResponseData(data);

  async function onSubmit(data: AddEditVacancy) {
    const res = await updateVacancy({ id: vacancy.id }, data);

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    show &&
    vacancy && (
      <DataLoader response={data} isProcessing={isLoading || isFetching}>
        <VacancyModal
          verb="Edit"
          defaultValues={
            {
              ...vacancy,
              deadline: vacancy.deadline.toISOString().split("T")[0],
            } as unknown as AddEditVacancy
          }
          onSubmit={onSubmit}
        />
      </DataLoader>
    )
  );
}
