"use client";

import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import React, { useLayoutEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Popup from "@/components/system/popup";
import { SelectItemField } from "@/components/system/select-item-field";
import { ChangeStatus, ChangeStatusSchema } from "../_lib/schema";
import { changeUserStatus } from "../_lib/actions";
import { UserStatus } from "@prisma/client";

export default function ChangeUserStatus() {
  const { route, searchParams } = useNavigation();
  const show = searchParams.has("status") && searchParams.has("id");
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangeStatus>({
    resolver: zodResolver(ChangeStatusSchema),
  });

  async function onSubmit(data: ChangeStatus) {
    const res = await changeUserStatus(
      { id: searchParams.get("id") as string },
      data.status
    );

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  useLayoutEffect(() => {
    if (show) {
      setValue("status", searchParams.get("status") as UserStatus, {
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [setValue, show, searchParams]);

  return (
    show && (
      <Popup
        isOpen={show}
        onClose={() => route()}
        hideCloseButton={true}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Popup.Header>Change User Status</Popup.Header>

        <Popup.Body>
          <SelectItemField
            source={UserStatus}
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

          <Popup.SubmitButton isLoading={isSubmitting} />
        </Popup.Footer>
      </Popup>
    )
  );
}
