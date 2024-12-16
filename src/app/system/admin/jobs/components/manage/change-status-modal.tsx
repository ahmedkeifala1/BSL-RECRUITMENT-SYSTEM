"use client";

import Popup from "@/components/system/popup";
import VerbPopup from "@/components/system/verb-popup";
import React, { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { ChangeJobStatus, ChangeJobStatusSchema } from "../../_lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItemField } from "@/components/system/select-item-field";
import { JobStatus } from "@prisma/client";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import { toast } from "react-toastify";
import { changeJobStatus } from "../../_lib/actions";

export default function ChangeJobStatusPage() {
  const { route, searchParams } = useNavigation();
  const show = searchParams.has("status") && searchParams.has("id");
  const status = searchParams.get("status") as JobStatus;

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangeJobStatus>({
    defaultValues: { status: status as JobStatus },
    resolver: zodResolver(ChangeJobStatusSchema),
  });

  async function onSubmit(data: ChangeJobStatus) {
    const res = await changeJobStatus(
      { id: searchParams.get("id") as string },
      data
    );

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  useLayoutEffect(() => {
    if (status) {
      setValue("status", status, { shouldTouch: true, shouldValidate: true });
    }
  }, [status, setValue]);

  return (
    show && (
      <VerbPopup
        as="form"
        size="xl"
        verb={status}
        action="status"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Popup.Header>Change Job Status</Popup.Header>

        <Popup.Body>
          <SelectItemField
            source={JobStatus}
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
