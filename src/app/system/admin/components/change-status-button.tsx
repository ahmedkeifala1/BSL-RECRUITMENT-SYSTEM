import NavActionButton, {
  NavActionButtonProps,
} from "@/components/system/nav-action-button";
import { AdminRole } from "@prisma/client";
import React from "react";

type ChangeStatusButtonProps = NavActionButtonProps & {
  role: AdminRole;
  allowedRoles?: AdminRole[];
  showChildrenCondition?: boolean;
};

export default function ChangeStatusButton({
  role,
  children,
  showChildrenCondition,
  allowedRoles = ["Director"],
  ...props
}: ChangeStatusButtonProps) {
  return (
    allowedRoles.some((r) => r === role) && (
      <>
        <NavActionButton color="warning" variant="solid" {...props}>
          {props.title ?? "Change status"}
        </NavActionButton>

        {showChildrenCondition ? showChildrenCondition && children : children}
      </>
    )
  );
}
