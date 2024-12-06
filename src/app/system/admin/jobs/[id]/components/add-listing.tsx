"use client";

import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import React from "react";
import { AddEditListing } from "../_lib/schema";
import ListingModal from "./listing-modal";
import { JobListingType } from "@prisma/client";
import { toast } from "react-toastify";
import { addListing } from "../_lib/actions";

export default function AddListing() {
  const { route, searchParams } = useNavigation();

  async function onSubmit(data: AddEditListing) {
    const res = await addListing(data);

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    searchParams.has("add") &&
    searchParams.has("id") && (
      <ListingModal
        action="Add"
        onSubmit={onSubmit}
        verb={searchParams.get("add") as JobListingType}
        defaultValues={
          {
            jobId: searchParams.get("id") as string,
          } as AddEditListing
        }
      />
    )
  );
}
