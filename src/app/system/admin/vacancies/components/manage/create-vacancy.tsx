"use client";

import React from "react";
import { AddEditVacancy } from "../../_lib/schemas";
import { addVacancy } from "../../_lib/actions";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import { toast } from "react-toastify";
import VacancyModal from "../vacancy-modal";

export default function CreateVacancy() {
  const { route, searchParams } = useNavigation();
  const show = searchParams.get("v") === "create";

  async function onSubmit(data: AddEditVacancy) {
    const res = await addVacancy(data);

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return show && <VacancyModal onSubmit={onSubmit} verb="Create" />;
}
