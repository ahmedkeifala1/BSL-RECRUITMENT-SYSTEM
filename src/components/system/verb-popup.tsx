"use client";

import { Drop } from "@/lib/shared/types";
import React from "react";
import Popup, { PopupProps } from "./popup";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";

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
  action,
  ...props
}: VerbPopupProps) {
  const { clear, searchParams } = useNavigation();
  const show = searchParams.get(action ?? "v") === verb;

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
