"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import { UserPlus2Icon, UserPlusIcon } from "lucide-react";
import React from "react";

export default function RegisterButton() {
  return (
    <Dropdown
      radius="sm"
      showArrow={true}
      placement="bottom-end"
      className="border border-primary-100"
    >
      <DropdownTrigger>
        <Button
          size="sm"
          radius="sm"
          color="primary"
          className="text-xs font-semibold"
        >
          Register
        </Button>
      </DropdownTrigger>

      <DropdownMenu>
        <DropdownItem
          as={Link}
          href="/register"
          startContent={<UserPlusIcon size={17} />}
        >
          Job Seeker
        </DropdownItem>
        <DropdownItem
          as={Link}
          href="/register/employee"
          startContent={<UserPlus2Icon size={17} />}
        >
          Employee
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
