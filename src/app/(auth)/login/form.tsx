"use client";

import { InputField, SubmitButton } from "@/components/custom";
import PasswordField from "@/components/password-field";
import { LogInIcon } from "lucide-react";
import React from "react";

export default function LoginForm() {
  return (
    <form className="w-full flex flex-col gap-4">
      <InputField
        label="Email"
        placeholder="Enter email address"
        size="lg"
        labelPlacement="outside"
      />

      <PasswordField />

      <SubmitButton
        fullWidth={true}
        className="font-semibold gap-1 hover:gap-2 delay-100"
        endContent={<LogInIcon size={18} />}
      >
        Login
      </SubmitButton>
    </form>
  );
}
