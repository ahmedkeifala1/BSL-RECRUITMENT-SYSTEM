"use client";

import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import React from "react";
import { NewAdmin, NewAdminSchema } from "../_lib/schema";
import { createAdmin } from "../_lib/actions";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import VerbPopup from "@/components/system/verb-popup";
import Popup from "@/components/system/popup";
import { SelectItemField } from "@/components/system/select-item-field";
import { AdminRole } from "@prisma/client";
import SelectStaffField from "../../staff/components/select-staff-field";

export default function AddAdmin() {
  const { route, searchParams } = useNavigation();
  const show = searchParams.get("v") === "create";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewAdmin>({
    resolver: zodResolver(NewAdminSchema),
  });

  async function onSubmit(data: NewAdmin) {
    const res = await createAdmin(data);

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    show && (
      <VerbPopup verb="create" as="form" onSubmit={handleSubmit(onSubmit)}>
        <Popup.Header>Create Admin</Popup.Header>

        <Popup.Body>
          <SelectStaffField
            props={{
              label: "Select staff",
              isInvalid: !!errors.staff_id,
              errorMessage: errors.staff_id?.message,
              ...register("staff_id"),
            }}
          />
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
      </VerbPopup>
    )
  );
}
