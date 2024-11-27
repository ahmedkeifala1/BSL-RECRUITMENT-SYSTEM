"use client";

import { Button, extendVariants, Input, Select } from "@nextui-org/react";

export const InputField = extendVariants(Input, {
  defaultVariants: {
    size: "sm",
    radius: "none",
    variant: "bordered",
  },
});

export const SelectField = extendVariants(Select, {
  defaultVariants: {
    size: "sm",
    radius: "none",
    variant: "bordered",
  },
});

export const EmailField = extendVariants(InputField, {
  defaultVariants: {
    type: "email",
    inputMode: "email",
  },
});

export const SubmitButton = extendVariants(Button, {
  defaultVariants: {
    size: "lg",
    radius: "none",
    type: "submit",
    color: "success",
  },
});

export const IconButton = extendVariants(Button, {
  defaultVariants: {
    size: "sm",
    radius: "none",
    variant: "flat",
    isIconOnly: "true",
  },
});
