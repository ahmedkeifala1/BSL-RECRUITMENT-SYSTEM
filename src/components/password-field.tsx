import { Drop } from "@/lib/core/types";
import { ButtonProps, InputProps } from "@nextui-org/react";
import React, { useState } from "react";
import { IconButton, InputField } from "./custom";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type PasswordFieldProps = Drop<InputProps, "ref"> & {
  buttonProps?: Drop<ButtonProps, "isIconOnly" | "children">;
};

export default function PasswordField({
  buttonProps,
  ...props
}: PasswordFieldProps) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <InputField
      size="lg"
      type={show ? "text" : "password"}
      label="Password"
      placeholder="Enter account password"
      labelPlacement="outside"
      {...props}
      classNames={{
        ...props?.classNames,
        input: "peer",
      }}
      endContent={
        <IconButton
          variant="light"
          {...buttonProps}
          tabIndex={-1}
          isIconOnly={true}
          onPress={() => setShow((pre) => !pre)}
        >
          {show ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
        </IconButton>
      }
    />
  );
}
