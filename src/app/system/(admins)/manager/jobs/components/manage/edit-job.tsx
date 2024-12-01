"use client";

import useNavigation from "@/lib/hooks/navigation-hook";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getJob, updateJob } from "../../_lib/actions";
import { getResponseData } from "@/lib/core/functions";
import { AddEditJob } from "../../_lib/schemas";
import JobModal from "../job-modal";
import DataLoader from "@/app/system/components/data-loader";
import { toast } from "react-toastify";

export default function EditJob() {
  const { route, searchParams } = useNavigation();
  const show = searchParams.has("id") && searchParams.get("v") === "edit";
  const { data, isLoading, isFetching } = useQuery({
    enabled: show,
    queryKey: ["edit-job", searchParams.get("id")],
    queryFn: () => getJob({ id: searchParams.get("id") as string }),
  });
  const job = getResponseData(data);

  async function onSubmit(data: AddEditJob) {
    const res = await updateJob({ id: job.id }, data);

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    show && (
      <DataLoader response={data} isProcessing={isLoading || isFetching}>
        <JobModal verb="Edit" defaultValues={job} onSubmit={onSubmit} />
      </DataLoader>
    )
  );
}
