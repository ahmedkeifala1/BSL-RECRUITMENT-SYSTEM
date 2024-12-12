import React from "react";
import empty from "@/assets/empty.jpg";
import Image from "next/image";

type EmptyContentProps = {
  message?: string;
  isQueried?: boolean;
};

export default function EmptyContent({
  message,
  isQueried = false,
}: Readonly<EmptyContentProps>) {
  return (
    <div className="flex justify-center flex-col items-center">
      <Image src={empty} width={176} height={176} alt="Empty icon" />
      <p>{isQueried ? "No matching record found" : message}</p>
    </div>
  );
}
