"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import React from "react";
import { UserPlus2Icon, UserPlusIcon } from "lucide-react";
import Navbar from "../navbar";

export default function SiteNavbar() {
  return (
    <Navbar className="text-blue-500">
      <Link href="/auth" className="text-inherit font-bold">
        Login
      </Link>

      <Dropdown
        radius="sm"
        showArrow={true}
        placement="bottom-end"
        className="border border-primary-100"
      >
        <DropdownTrigger>
          <Button
            size="sm"
            color="primary"
            radius="sm"
            className="text-xs font-semibold"
          >
            Register
          </Button>
        </DropdownTrigger>

        <DropdownMenu>
          <DropdownItem
            as={Link}
            href="/auth/register"
            startContent={<UserPlusIcon size={17} />}
          >
            Job Seeker
          </DropdownItem>
          <DropdownItem
            as={Link}
            href="/auth/register/employee"
            startContent={<UserPlus2Icon size={17} />}
          >
            Employee
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Navbar>
  );
}
