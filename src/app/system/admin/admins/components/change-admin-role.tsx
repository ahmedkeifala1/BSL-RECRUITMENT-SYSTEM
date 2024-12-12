"use client";

import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import React, { useLayoutEffect } from "react";
import { ChangeAdminRole, ChangeAdminRoleSchema } from "../_lib/schema";
import { changeRole } from "../_lib/actions";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Popup from "@/components/system/popup";
import { SelectItemField } from "@/components/system/select-item-field";
import { AdminRole } from "@prisma/client";

export default function ChangeRole() {
  const { route, searchParams } = useNavigation();
  const show = searchParams.has("role");
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangeAdminRole>({
    resolver: zodResolver(ChangeAdminRoleSchema),
  });

  async function onSubmit(data: ChangeAdminRole) {
    const res = await changeRole(
      { id: searchParams.get("id") as string },
      data.role
    );

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  useLayoutEffect(() => {
    if (show) {
      setValue("role", searchParams.get("role") as AdminRole, {
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [show, setValue, searchParams]);

  return (
    show && (
      <Popup
        as="form"
        isOpen={show}
        hideCloseButton={true}
        onClose={() => route()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Popup.Header>Change Role</Popup.Header>

        <Popup.Body>
          <SelectItemField
            source={AdminRole}
            props={{
              label: "Select role",
              isInvalid: !!errors.role,
              errorMessage: errors.role?.message,
              ...register("role"),
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
