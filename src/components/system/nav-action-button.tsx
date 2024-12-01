"use client";

import useNavigation, {
  NavPath,
  NavPathClear,
} from "@/lib/hooks/navigation-hook";
import { Drop } from "@/lib/core/types";
import { Button, ButtonProps } from "@nextui-org/react";
import React from "react";

type NavActionButtonProps = Drop<ButtonProps, "onPress" | "href" | "as"> & {
  nav: NavPath[];
  clear?: NavPathClear;
};

export default function NavActionButton({
  nav,
  clear,
  children,
  ...props
}: NavActionButtonProps) {
  const { navigate } = useNavigation();

  return (
    <Button
      size="sm"
      radius="none"
      variant="light"
      color="success"
      className="font-semibold"
      {...props}
      onPress={() => navigate(nav, clear)}
    >
      {children}
    </Button>
  );
}
