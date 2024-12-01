import { CircularProgress } from "@nextui-org/react";
import React from "react";

export default function Loader({
  message,
}: {
  message: string | React.ReactNode;
}) {
  return (
    <div className="flex-1 flex justify-center gap-3 items-center fixed top-0 left-0 w-screen h-screen backdrop-blur z-10">
      <CircularProgress size="sm" />
      {typeof message === "string" ? (
        <span className="animate-pulse">{message}</span>
      ) : (
        message
      )}
    </div>
  );
}
