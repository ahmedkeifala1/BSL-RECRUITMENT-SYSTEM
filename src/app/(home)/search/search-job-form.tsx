"use client";

import React from "react";
import { InputField, SubmitButton } from "../../../components/custom";
import { SearchIcon } from "lucide-react";
import { ButtonProps, InputProps } from "@nextui-org/react";

type SearchJobFormProps = {
  defaultValue?: string;
  inputProps?: InputProps;
  buttonProps?: ButtonProps;
};

export default function SearchJobForm({
  inputProps,
  buttonProps,
  defaultValue,
}: SearchJobFormProps) {
  return (
    <form
      method="GET"
      action="/search"
      className="bg-white p-1 flex gap-2 items-center"
    >
      <InputField
        size="md"
        id="search"
        type="search"
        radius="none"
        className="flex-1"
        defaultValue={defaultValue}
        placeholder="Search for jobs"
        startContent={
          <label htmlFor="search">
            <SearchIcon size={20} />
          </label>
        }
        {...inputProps}
        name="query"
        required={true}
      />

      <SubmitButton
        size="md"
        radius="none"
        className="bg-blue-600 text-white"
        {...buttonProps}
      >
        {buttonProps?.children || "Search"}
      </SubmitButton>
    </form>
  );
}
