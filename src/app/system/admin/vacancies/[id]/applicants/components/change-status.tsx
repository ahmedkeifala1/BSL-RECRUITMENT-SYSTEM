"use client";

import VerbPopup from "@/components/system/verb-popup";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import { ApplicationStatus } from "@prisma/client";
import React from "react";
import { toast } from "react-toastify";
import { changeApplicationStatus } from "../_lib/action";
import {
  ChangeApplicationStatus,
  ChangeApplicationStatusSchema,
} from "../_lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Popup from "@/components/system/popup";
import { SelectItemField } from "@/components/system/select-item-field";

type ChangeApplicantStatusFormProps = {
  defaultValues?: ChangeApplicationStatus;
  onSubmit: (data: ChangeApplicationStatus) => void;
};

function ChangeApplicantStatusForm({
  defaultValues,
  onSubmit,
}: ChangeApplicantStatusFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangeApplicationStatus>({
    defaultValues,
    resolver: zodResolver(ChangeApplicationStatusSchema),
  });

  return (
    <VerbPopup
      as="form"
      size="xl"
      action="status"
      verb={defaultValues?.status as string}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Popup.Header>Change Vacancy Status</Popup.Header>

      <Popup.Body>
        <SelectItemField
          source={ApplicationStatus}
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
  );
}

export default function ChangeApplicantStatus() {
  const { route, searchParams } = useNavigation();
  const status = searchParams.get("status") as ApplicationStatus;
  const show = searchParams.has("id") && searchParams.has("status");

  async function onSubmit(data: ChangeApplicationStatus) {
    const res = await changeApplicationStatus(data);

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    show && (
      <ChangeApplicantStatusForm
        onSubmit={onSubmit}
        defaultValues={{ status, id: searchParams.get("id") as string }}
      />
    )
  );
}
