"use client";

import DataLoader from "@/app/system/components/data-loader";
import React from "react";
import ListingModal from "./listing-modal";
import { JobListingType } from "@prisma/client";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import { getListing, updateListing } from "../_lib/actions";
import { AddEditListing } from "../_lib/schema";
import { getResponseData } from "@/lib/shared/utils";

export default function EditListing() {
  const { route, searchParams } = useNavigation();
  const show = searchParams.has("edit") && searchParams.has("id");
  const { data, isLoading, isFetching } = useQuery({
    enabled: show,
    queryKey: ["edit-listing", searchParams.get("id")],
    queryFn: () => getListing({ id: searchParams.get("id") as string }),
  });
  const listing = getResponseData(data);

  async function onSubmit(data: AddEditListing) {
    const res = await updateListing({ id: listing.id }, data);

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  return (
    show && (
      <DataLoader response={data} isProcessing={isLoading || isFetching}>
        <ListingModal
          action="Edit"
          onSubmit={onSubmit}
          verb={searchParams.get("edit") as JobListingType}
          defaultValues={listing}
        />
      </DataLoader>
    )
  );
}
