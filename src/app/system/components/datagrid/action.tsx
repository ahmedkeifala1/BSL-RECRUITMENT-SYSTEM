"use client";

import { IconButton } from "@/components/custom";
import { ButtonProps, Link } from "@nextui-org/react";
import { ArrowRightIcon, EditIcon, TrashIcon } from "lucide-react";
import React, { PropsWithChildren } from "react";

type RowActionProps = PropsWithChildren;

export default function RowAction({ children }: Readonly<RowActionProps>) {
  return <div className="flex justify-end gap-2">{children}</div>;
}

RowAction.Button = function RowButton({
  children,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <IconButton as={Link} isIconOnly={true} {...props}>
      {children}
    </IconButton>
  );
};

RowAction.EditButton = function RowEditButton({
  children,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <IconButton as={Link} title="Edit" isIconOnly={true} {...props}>
      {children ?? <EditIcon size={17} />}
    </IconButton>
  );
};

RowAction.DeleteButton = function RowDeleteButton({
  children,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <IconButton
      as={Link}
      title="Delete"
      color="danger"
      isIconOnly={true}
      {...props}
    >
      {children ?? <TrashIcon size={17} />}
    </IconButton>
  );
};

RowAction.SelectButton = function RowSelectButton({
  children,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <RowAction.Button
      as={Link}
      variant="flat"
      color="primary"
      isIconOnly={false}
      className="font-semibold"
      endContent={<ArrowRightIcon size={15} />}
      {...props}
    >
      {children ?? "Select"}
    </RowAction.Button>
  );
};
