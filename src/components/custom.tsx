"use client";

import { Button, extendVariants, Input } from "@nextui-org/react";

export const InputField = extendVariants(Input, {
  defaultVariants: {
    size: "sm",
    radius: "sm",
    variant: "bordered",
  },
});

export const SubmitButton = extendVariants(Button, {
  defaultVariants: {
    size: "lg",
    radius: "sm",
    type: "submit",
    color: "success",
  },
});

export const IconButton = extendVariants(Button, {
  defaultVariants: {
    size: "sm",
    radius: "sm",
    isIconOnly: "true",
    variant: "flat",
  },
});
