"use client";

import { Drop } from "@/lib/core/types";
import React from "react";
import Popup, { PopupProps } from "./popup";
import useNavigation from "@/lib/hooks/navigation-hook";

type VerbPopupProps = Drop<
  PopupProps,
  | "isOpen"
  | "isDismissable"
  | "onClose"
  | "isKeyboardDismissDisabled"
  | "hideCloseButton"
> & {
  verb: string;
  action?: string;
};

export default function VerbPopup({
  verb,
  children,
  action = "verb",
  ...props
}: VerbPopupProps) {
  const { clear, searchParams } = useNavigation();
  const show = searchParams.get(action) === verb;

  return (
    <Popup
      {...props}
      isOpen={show}
      isDismissable={false}
      hideCloseButton={true}
      isKeyboardDismissDisabled={true}
      onClose={() => clear()}
    >
      {children}
    </Popup>
  );
}
