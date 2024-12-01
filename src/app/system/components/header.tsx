"use client";

import { Button } from "@nextui-org/react";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, ReactNode } from "react";

type HeaderProps = PropsWithChildren & {
  returnUrl?: string;
  title: string | ReactNode;
  returnContent?: string | ReactNode;
  description?: string | ReactNode;
};

export default function Header({
  title,
  returnUrl,
  returnContent,
  description,
  children,
}: HeaderProps) {
  const { back } = useRouter();

  return (
    <div className="border-b-2 border-gray-100 py-1 flex justify-between gap-4 flex-wrap items-end pb-2">
      <header className="flex flex-col justify-center gap-1 leading-3">
        {returnUrl && (
          <div className="">
            <Button
              size="sm"
              radius="none"
              variant="light"
              onPress={back}
              color="warning"
              startContent={<ArrowLeftIcon size={18} />}
              className="justify-start gap-1 px-1 font-semibold"
            >
              {returnContent ?? "Back"}
            </Button>
          </div>
        )}

        {typeof title === "string" ? (
          <h1 className="text-4xl font-bold">{title}</h1>
        ) : (
          title
        )}
        {typeof description === "string" ? (
          <p className="font-semibold text-slate-500">{description}</p>
        ) : (
          description
        )}
      </header>

      {children}
    </div>
  );
}
