"use client";

import { Drop } from "@/lib/core/types";
import {
  Button,
  ButtonProps,
  extendVariants,
  Modal,
  ModalBody,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";
import React, { useContext } from "react";
import { createContext } from "react";

export type PopupProps = ModalProps & {
  contentProps?: Drop<ModalContentProps, "children">;
};

type PopupContextType = {
  show: boolean;
  onClose: () => void;
};

const PopupContext = createContext<PopupContextType>({
  show: false,
  onClose() {},
});

function usePopupContext() {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error("PopupContext must be used with its provider");
  }

  return context;
}

export default function Popup({
  children,
  contentProps,
  isOpen,
  onClose,
  ...props
}: PopupProps) {
  const show = isOpen ?? false;
  function handleClose() {
    if (onClose) {
      onClose();
    }
  }

  return (
    isOpen && (
      <PopupContext.Provider value={{ show, onClose: handleClose }}>
        <Modal
          radius="none"
          backdrop="blur"
          {...props}
          isOpen={show}
          onClose={onClose}
        >
          <ModalContent {...contentProps}>{children}</ModalContent>
        </Modal>
      </PopupContext.Provider>
    )
  );
}

Popup.Header = extendVariants(ModalHeader, {
  defaultVariants: {
    className: "border-none",
  },
});

Popup.Body = extendVariants(ModalBody, {
  defaultVariants: {
    className: "py-2",
  },
});

Popup.Footer = extendVariants(ModalFooter, {
  defaultVariants: {
    className: "border-none",
  },
});

Popup.Button = function PopupButton({ children, ...props }: ButtonProps) {
  return (
    <Button radius="none" {...props}>
      {children}
    </Button>
  );
};

Popup.CancelButton = function PopupCancelButton({
  children,
  ...props
}: ButtonProps) {
  const { onClose } = usePopupContext();

  return (
    <Popup.Button onPress={onClose} {...props}>
      {children ?? "Cancel"}
    </Popup.Button>
  );
};
