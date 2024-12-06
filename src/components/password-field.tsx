import { Drop } from "@/lib/shared/types";
import { ButtonProps, InputProps } from "@nextui-org/react";
import React, { useState } from "react";
import { IconButton, InputField } from "./custom";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type PasswordFieldProps = {
  props?: InputProps;
  buttonProps?: Drop<ButtonProps, "isIconOnly" | "children">;
};

export default function PasswordField({
  props,
  buttonProps,
}: PasswordFieldProps) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <InputField
      type={show ? "text" : "password"}
      label="Password"
      placeholder=""
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
          className="peer-placeholder-shown:hidden"
        >
          {show ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
        </IconButton>
      }
      {...props}
    />
  );
}
