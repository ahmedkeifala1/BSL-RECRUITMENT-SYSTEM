"use client";

import Popup from "@/components/system/popup";
import VerbPopup from "@/components/system/verb-popup";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItemField } from "@/components/system/select-item-field";
import { VacancyStatus } from "@prisma/client";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import { toast } from "react-toastify";
import {
  ChangeVacancyStatus,
  ChangeVacancyStatusSchema,
} from "../../_lib/schemas";
import { changeVacancyStatus } from "../../_lib/actions";

export default function ChangeVacancyStatusPage() {
  const { route, searchParams } = useNavigation();
  const show = searchParams.has("status") && searchParams.has("id");
  const status = searchParams.get("status") as string;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangeVacancyStatus>({
    defaultValues: { status: status as VacancyStatus },
    resolver: zodResolver(ChangeVacancyStatusSchema),
  });

  async function onSubmit(data: ChangeVacancyStatus) {
    const res = await changeVacancyStatus(
      { id: searchParams.get("id") as string },
      data
    );

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    show && (
      <VerbPopup
        as="form"
        size="xl"
        verb={status}
        action="status"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Popup.Header>Change Vacancy Status</Popup.Header>

        <Popup.Body>
          <SelectItemField
            source={VacancyStatus}
            props={{
              label: "Select status",
              isInvalid: !!errors.status,
              errorMessage: errors.status?.message,
              ...register("status"),
            }}
          />
        </Popup.Body>

        <Popup.Footer>
          <Popup.CancelButton />

          <Popup.Button
            isLoading={isSubmitting}
            color="success"
            className="font-semibold"
            type="submit"
          >
            Change Status
          </Popup.Button>
        </Popup.Footer>
      </VerbPopup>
    )
  );
}
