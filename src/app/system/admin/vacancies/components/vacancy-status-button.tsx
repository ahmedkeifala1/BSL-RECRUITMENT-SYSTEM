"use client";

import { cn } from "@nextui-org/react";
import React from "react";
import NavActionButton from "@/components/system/nav-action-button";

type VacancyStatusButtonProps = {
  id?: string;
  title: string;
  total: number;
  isActive?: boolean;
  actionKey?: string;
};

export default function VacancyStatusButton({
  id,
  title,
  total,
  isActive = false,
  actionKey = "f",
}: VacancyStatusButtonProps) {
  return (
    <NavActionButton
      nav={[{ key: actionKey, value: id }]}
      color={isActive ? "warning" : "default"}
      variant={isActive ? "bordered" : "light"}
      className={cn(
        isActive ? "border-x-0 border-t-0" : "",
        "px-1 font-semibold"
      )}
      endContent={
        <span
          className={cn(
            "px-1 text-foreground rounded",
            isActive ? "bg-warning" : "bg-default"
          )}
        >
          {total}
        </span>
      }
    >
      {title}
    </NavActionButton>
  );
}
