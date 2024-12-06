import { Icon } from "@/lib/frontend/icons";
import { cn } from "@nextui-org/react";
import React from "react";

export default function DocumentIcon({
  type,
  size,
}: {
  type: string;
  size?: number;
}) {
  const isPdf = type.toLowerCase().indexOf("pdf") > -1;

  return (
    <Icon
      name={isPdf ? "FileTextIcon" : "ImageIcon"}
      size={size ?? 24}
      className={cn(isPdf ? "text-red-500" : "text-foreground")}
    />
  );
}
