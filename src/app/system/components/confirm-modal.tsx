"use client";

import Popup from "@/components/system/popup";
import { ButtonProps } from "@nextui-org/react";
import React, { useState } from "react";

type ConfirmModalProps = {
  entity: string;
  action: string;
  show: boolean;
  entity_name?: string;
  onHide?: () => void;
  children?: React.ReactNode;
  yesBtnProps?: ButtonProps;
  noBtnProps?: ButtonProps;
  actionFn?: () => Promise<void>;
};

export default function ConfirmModal(props: Readonly<ConfirmModalProps>) {
  const [processing, setProcessing] = useState<boolean>(false);

  async function handleConfirm() {
    if (!props.actionFn) return;

    setProcessing(true);
    await props.actionFn().finally(() => setProcessing(false));
  }

  return (
    <Popup isOpen={props.show} onClose={props.onHide}>
      <Popup.Header>
        {props.action} {props.entity}
      </Popup.Header>

      <Popup.Body>
        {props.children ?? (
          <p>
            Are you sure you want to {props.action.toLowerCase()}{" "}
            <em className="font-semibold">
              {`${
                props.entity_name ?? "this"
              } ${props.entity?.toLowerCase()}` || props.entity?.toLowerCase()}
            </em>
            ?
          </p>
        )}
      </Popup.Body>

      <Popup.Footer>
        <Popup.CancelButton {...props.noBtnProps}>
          {props.noBtnProps?.title ?? "Cancel"}
        </Popup.CancelButton>

        <Popup.Button
          color="danger"
          onPress={handleConfirm}
          {...props.yesBtnProps}
          isLoading={processing}
        >
          {props.yesBtnProps?.title ?? "Confirm"}
        </Popup.Button>
      </Popup.Footer>
    </Popup>
  );
}
