"use client";

import { Button } from "@nextui-org/react";
import React from "react";
import { verifyOtp } from "../register/_lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function VerifyOtpForm() {
  const { replace } = useRouter();
  async function handleVerify() {
    const res = await verifyOtp({
      confirmPassword: "Login@2024",
      email: "user@test.com",
      firstName: "User",
      fullName: "User Test",
      password: "Login@2024",
      title: "Mr",
      lastName: "Test",
    });

    if (res.isSuccess) {
      replace("/verify-otp");
    }

    toast(res.message, {
      type: res.isSuccess ? "success" : "error",
    });
  }
  return (
    <div>
      <Button onPress={handleVerify}>Generate token</Button>
    </div>
  );
}
