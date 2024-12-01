"use client";

import React from "react";
import { AddEditJob } from "../../_lib/schemas";
import { addJob } from "../../_lib/actions";
import useNavigation from "@/lib/hooks/navigation-hook";
import { toast } from "react-toastify";
import JobModal from "../job-modal";

export default function CreateJob() {
  const { route } = useNavigation();

  async function onSubmit(data: AddEditJob) {
    const res = await addJob(data);

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return <JobModal onSubmit={onSubmit} verb="Create" />;
}
