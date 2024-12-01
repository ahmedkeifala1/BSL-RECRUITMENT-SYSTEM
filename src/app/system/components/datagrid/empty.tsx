import React from "react";

type EmptyContentProps = {
  message?: string;
  isQueried?: boolean;
};

export default function EmptyContent({
  message,
  isQueried = false,
}: Readonly<EmptyContentProps>) {
  return (
    <div>
      {isQueried ? <>Queried</> : <>Not queried</>}
      <p>{message}</p>
    </div>
  );
}
