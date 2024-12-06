import { getLoggedUser } from "@/app/auth/_lib/actions";
import { IconButton } from "@/components/custom";
import { ButtonProps, Link } from "@nextui-org/react";
import React from "react";

type ApplyButtonProps = ButtonProps & {
  vacancyId: string;
};

export default async function ApplyButton({
  vacancyId,
  children,
  ...props
}: ApplyButtonProps) {
  const path = `${vacancyId}/apply`;
  const userData = await getLoggedUser();
  const route = userData.isSuccess
    ? path
    : `/auth?return=${encodeURI("/jobs/" + path)}`;

  return (
    <IconButton
      size="md"
      color="success"
      variant="solid"
      className="font-semibold"
      {...props}
      isIconOnly={false}
      as={Link}
      href={route}
    >
      {children ?? props?.title ?? "Apply"}
    </IconButton>
  );
}
