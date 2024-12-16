"use client";

import { LoggedUser } from "@/app/auth/_lib/schemas";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
  User,
} from "@nextui-org/react";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";
import { Icon } from "@/lib/frontend/icons";
import { Route } from "../_lib/schema";

type UserDropdownProps = {
  user: LoggedUser;
  routes?: Route[];
};

export default function UserDropdown({ user, routes }: UserDropdownProps) {
  return (
    <Dropdown radius="none" placement="bottom-end" className="border">
      <DropdownTrigger className="text-blue-800">
        <User
          as="button"
          avatarProps={{
            size: "sm",
            isBordered: true,
          }}
          name={user.fullName}
          description={user.email}
          classNames={{
            name: "font-bold",
            description: "text-blue-400",
          }}
        />
      </DropdownTrigger>

      <DropdownMenu>
        {/* <DropdownItem
          as={Link}
          href="/system/profile"
          className="text-foreground"
          endContent={<Icon name="Settings2Icon" />}
        >
          Profile
        </DropdownItem> */}

        <DropdownSection items={routes ?? ([] as Route[])} showDivider={true}>
          {(route) => (
            <DropdownItem
              as={Link}
              href={route.href}
              className="text-foreground"
              key={`custom-route-${route.href}`}
              endContent={<Icon name={route.icon} />}
            >
              {route.title}
            </DropdownItem>
          )}
        </DropdownSection>

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
