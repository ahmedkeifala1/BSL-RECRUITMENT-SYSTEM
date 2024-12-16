import React from "react";
import Header from "../../components/header";
import Toolkit from "../../components/datagrid/toolkit";
import CandidatesList from "./components/candidates-list";
import { getResponseData } from "@/lib/shared/utils";
import { getPaginatedParams } from "@/lib/frontend/utils";
import { ListProps } from "@/lib/shared/types";
import { listCandidates } from "./_lib/actions";

type CandidatesPageProps = ListProps;

export default async function CandidatesPage({
  searchParams,
}: CandidatesPageProps) {
  const { skip, ...meta } = getPaginatedParams(searchParams);
  const [total, candidatesData] = await listCandidates({
    where: !meta.q
      ? undefined
      : {
          jobSeeker: {
            OR: [
              {
                fullName: {
                  mode: "insensitive",
                  contains: meta.q,
                },
              },
              {
                email: {
                  mode: "insensitive",
                  contains: meta.q,
                },
              },
            ],
          },
        },
  });
  const candidates = getResponseData(candidatesData, []);

  return (
    <div>
      <div className="flex-1 flex flex-col gap-3">
        <Header
          title="Candidates"
          description="Manage shortlisted candidates"
        />

        <Toolkit />

        <div className="flex-1">
          <CandidatesList
            candidates={candidates}
            meta={{ ...meta, skip, total }}
          />
        </div>
      </div>
    </div>
  );
}
