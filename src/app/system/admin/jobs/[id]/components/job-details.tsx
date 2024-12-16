"use client";

import React from "react";
import AddListing from "./add-listing";
import EditListing from "./edit-listing";
import RemoveListing from "./remove-listing";
import NavActionButton from "@/components/system/nav-action-button";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { JobDetail } from "../../_lib/schemas";
import { LoggedUser } from "@/app/auth/_lib/schemas";
import { pluralise } from "@/lib/shared/utils";
import { JobListings } from "../_lib/schema";

type JobDetailsProps = {
  job: JobDetail;
  user?: LoggedUser;
  showDescription?: boolean;
};

function JobListing({
  jobKey,
  isAdmin,
  listing,
}: {
  jobKey: string;
  isAdmin: boolean;
  listing: JobListings;
}) {
  return (
    <div className="space-y-2" key={listing.key}>
      <div className="flex justify-between gap-3">
        <h4 className="text-base font-semibold">{pluralise(listing.key)}</h4>

        {isAdmin && (
          <NavActionButton
            nav={[
              { key: "add", value: listing.key },
              { key: "id", value: jobKey },
            ]}
          >
            Add new
          </NavActionButton>
        )}
      </div>

      {listing.listings.length < 1 ? (
        <em className="text-sm text-red-500">
          No {listing.key.toLowerCase()} added
        </em>
      ) : (
        <div className="space-y-4">
          {listing.listings.map((listing) => (
            <div className="p-1" key={listing.id}>
              <div className="flex justify-between gap-3">
                <h5 className="text-sm italic font-semibold">{listing.name}</h5>

                {isAdmin && (
                  <div className="flex italic gap-2 pl-1">
                    <NavActionButton
                      color="default"
                      isIconOnly={true}
                      nav={[
                        { key: "edit", value: listing.type },
                        { key: "id", value: listing.id },
                      ]}
                    >
                      <Edit2Icon size={13} />
                    </NavActionButton>

                    <NavActionButton
                      color="danger"
                      isIconOnly={true}
                      nav={[
                        { key: "remove", value: listing.type },
                        { key: "id", value: listing.id },
                      ]}
                    >
                      <Trash2Icon size={13} />
                    </NavActionButton>
                  </div>
                )}
              </div>

              <ul className="list-disc list-inside">
                {listing.requirements.map((requirement) => (
                  <li key={requirement} className="text-sm list-item">
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JobDetails({
  job,
  user,
  showDescription = true,
}: JobDetailsProps) {
  const isAdmin = user?.userType === "Admin";
  const responsibilities = job.listings?.find(
    (listing) => listing.key === "Responsibility"
  );
  const listings = job.listings?.filter(
    (listing) => listing.key !== "Responsibility"
  );

  return (
    <>
      <div className="py-6 space-y-12">
        {showDescription && (
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <p className="flex gap-2">
              <span className="font-semibold text-slate-700">Date posted:</span>
              <strong>{job.createdAt.toDateString()}</strong>
            </p>

            <p className="flex gap-2">
              <span className="font-semibold text-slate-700">Status:</span>
              <strong>{job.status.replaceAll("_", " ")}</strong>
            </p>

            <p className="flex gap-2">
              <span className="font-semibold text-slate-700">
                Employment type:
              </span>
              <strong>{job.type.replaceAll("_", " ")}</strong>
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <div className="col-span-1 lg:col-span-4 space-y-6">
            <section id="description">
              <h5 className="text-xl">Overview</h5>
              <p>{job.description}</p>
            </section>

            <section id="responsibilities">
              {responsibilities && (
                <JobListing
                  isAdmin={isAdmin}
                  jobKey={job.id}
                  listing={responsibilities}
                />
              )}
            </section>
          </div>

          <div className="col-span-1 lg:col-span-2 bg-gray-100 p-3 space-y-8">
            {listings?.map((listing) => (
              <JobListing
                key={listing.key}
                isAdmin={isAdmin}
                jobKey={job.id}
                listing={listing}
              />
            ))}
          </div>
        </div>
      </div>

      {isAdmin && (
        <>
          <AddListing />

          <EditListing />

          <RemoveListing />
        </>
      )}
    </>
  );
}
