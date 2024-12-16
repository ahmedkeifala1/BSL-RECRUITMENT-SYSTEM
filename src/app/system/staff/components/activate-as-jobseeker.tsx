"use client";

import React from "react";
import ConfirmModal from "../../components/confirm-modal";
import { toast } from "react-toastify";
import { activateAsJobSeeker } from "../_lib/actions";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import { Staff } from "@prisma/client";

export default function ActivateAsJobSeeker({ staff }: { staff: Staff }) {
  const { refresh } = useNavigation();

  async function handleConfirm() {
    const res = await activateAsJobSeeker(staff);

    if (res.isSuccess) {
      refresh();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    <ConfirmModal
      entity="Staff"
      action="Activate as Job Seeking"
      actionFn={handleConfirm}
      show={true}
      yesBtnProps={{
        title: "Activate",
        color: "success",
        className: "font-semibold",
      }}
    >
      <p>
        You are not yet a Job Seeker. Would you like to activate your account?
      </p>
    </ConfirmModal>
  );
}
