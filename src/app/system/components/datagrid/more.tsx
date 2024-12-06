"use client";

import { Drop } from "@/lib/shared/types";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownItemProps,
  DropdownMenu,
  DropdownMenuProps,
  DropdownProps,
  DropdownSection,
  DropdownTrigger,
  extendVariants,
  Link,
} from "@nextui-org/react";
import { MoreVerticalIcon } from "lucide-react";
import React from "react";

type MoreActionProps = Drop<DropdownProps, "children"> & {
  children: DropdownMenuProps["children"];
};

export default function MoreAction({
  children,
  ...props
}: Readonly<MoreActionProps>) {
  return (
    <div className="flex justify-end">
      <Dropdown
        radius="sm"
        placement="bottom-end"
        className="border shadow-sm"
        {...props}
      >
        <DropdownTrigger>
          <Button size="sm" radius="sm" variant="light" isIconOnly={true}>
            <MoreVerticalIcon size={18} />
          </Button>
        </DropdownTrigger>

        <DropdownMenu>{children}</DropdownMenu>
      </Dropdown>
    </div>
  );
}

MoreAction.Item = extendVariants(DropdownItem, {
  defaultVariants: {
    color: "default",
    className: "text-foreground",
  },
});

MoreAction.Section = extendVariants(DropdownSection, {
  defaultVariants: {
    showDivider: "true",
  },
});

MoreAction.EditButton = function MoreActionEditButton({
  children,
  ...props
}: Readonly<DropdownItemProps>) {
  return (
    <MoreAction.Item as={Link} className="text-foreground" {...props}>
      {children}
    </MoreAction.Item>
  );
};

MoreAction.DeleteButton = function MoreActionDeleteButton({
  children,
  ...props
}: Readonly<DropdownItemProps>) {
  return (
    <MoreAction.Item
      as={Link}
      color="danger"
      className="text-danger"
      {...props}
    >
      {children}
    </MoreAction.Item>
  );
};
