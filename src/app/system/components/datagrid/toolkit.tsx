import React, { PropsWithChildren } from "react";
import SearchInput from "./search";

type ToolbarProps = PropsWithChildren & {
  showSearch?: boolean;
};

export default function Toolkit({
  children,
  showSearch,
}: Readonly<ToolbarProps>) {
  return (
    <section id="toolbar" className="flex flex-wrap gap-3 items-end">
      <div className="flex-1">{children}</div>

      {showSearch ? undefined : (
        <div className="w-full sm:w-[20rem] bg-red">
          <SearchInput />
        </div>
      )}
    </section>
  );
}
