"use client";

import { LoggedUser } from "@/app/auth/_lib/schemas";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  User,
} from "@nextui-org/react";
import { LogOutIcon, Settings2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

type UserDropdownProps = {
  user: LoggedUser;
};

export default function UserDropdown({ user }: UserDropdownProps) {
  return (
    <Dropdown radius="none" placement="bottom-end" className="border">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            size: "sm",
            isBordered: true,
          }}
          name={user.fullName}
          description={user.email}
          classNames={{
            name: "font-semibold",
          }}
        />
      </DropdownTrigger>

      <DropdownMenu>
        <DropdownItem
          as={Link}
          href="/system/profile"
          className="text-foreground"
          endContent={<Settings2Icon size={15} />}
        >
          Profile
        </DropdownItem>

        <DropdownItem
          as={Link}
          href="/auth"
          onPress={() =>
            signOut({
              redirect: true,
            })
          }
          color="danger"
          className="text-danger-500"
          endContent={<LogOutIcon size={15} />}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
