"use client";

import React from "react";
import { SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { InputField } from "@/components/custom";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";

export default function SearchInput() {
  const { navigate, searchParams } = useNavigation();

  const handleSearch = useDebouncedCallback((query: string) => {
    navigate(
      [{ key: "q", value: query }],
      [{ key: "p", value: "1", action: "delete" }]
    );
  }, 500);

  return (
    <InputField
      id="search"
      type="search"
      fullWidth={true}
      placeholder="Search"
      autoFocus={searchParams.has("query")}
      startContent={
        <label htmlFor="search">
          <SearchIcon size={15} />
        </label>
      }
      defaultValue={searchParams.get("query") || ""}
      onChange={({ currentTarget: { value } }) => handleSearch(value)}
    />
  );
}
