"use client";

import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { runEvaluation } from "../_lib/action";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import { Icon } from "@/lib/frontend/icons";

type EvaluateButtonProps = {
  applicationId: string;
};

export default function EvaluateButton({ applicationId }: EvaluateButtonProps) {
  const { route } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  async function handleEvaluate() {
    setIsLoading(true);

    const res = await runEvaluation(applicationId).finally(() =>
      setIsLoading(false)
    );

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    <Button
      size="sm"
      color="secondary"
      variant="flat"
      isLoading={isLoading}
      onPress={handleEvaluate}
      startContent={!isLoading && <Icon name="Sparkles" size={16} />}
    >
      Run AI Evaluation
    </Button>
  );
}
