import {
  getPaginatedParams,
  getShowingRecordsText,
} from "@/lib/frontend/utils";
import { GridPaginateMeta, ListProps } from "@/lib/shared/types";
import React from "react";
import { getVacancyApplicants } from "../../_lib/actions";
import { getResponseData } from "@/lib/shared/utils";
import Header from "@/app/system/components/header";
import FileView from "@/app/system/components/file-view";
import DocumentIcon from "@/app/system/components/document-icon";
import { Chip, Link } from "@nextui-org/react";
import ChangeStatusButton from "../../../components/change-status-button";
import ChangeApplicantStatus from "./components/change-status";
import Paging from "@/app/system/components/datagrid/paging";
import EmptyContent from "@/app/system/components/datagrid/empty";
import { getLoggedAdmin } from "../../../_lib/actions";
import EvaluateButton from "./components/evaluate-button";

type VacancyApplicantsPageProps = ListProps & {
  params: { id: string };
};

export default async function VacancyApplicantsPage({
  params,
  searchParams,
}: VacancyApplicantsPageProps) {
  const admin = getResponseData(await getLoggedAdmin());
  const { skip, ...meta } = getPaginatedParams(searchParams);
  const [total, vacancyData] = await getVacancyApplicants(
    { id: params.id },
    {
      skip,
      take: 1,
      where: {
        status: {
          notIn: ["Hired", "Shortlisted"],
        },
        OR: !meta.q
          ? undefined
          : [
              {
                jobSeeker: {
                  OR: [
                    { email: { mode: "insensitive", contains: meta.q } },
                    { firstName: { mode: "insensitive", contains: meta.q } },
                  ],
                },
              },
            ],
      },
    }
  );
  const vacancy = getResponseData(vacancyData);

  return (
    <div className="space-y-4">
      <Header
        returnUrl="/"
        returnContent="Back to vacancies"
        title={`${vacancy.job.title} Applicants`}
        description={`Manage all applicants for the ${vacancy.job.title} vacancy`}
      >
        {total > 0 && (
          <p>
            {getShowingRecordsText({ l: 1, skip, total } as GridPaginateMeta)}
          </p>
        )}
      </Header>

      {vacancy.applicants.length < 1 ? (
        <EmptyContent
          isQueried={!!meta.q}
          message="All applicants have been shortlisted or hired"
        />
      ) : (
        vacancy.applicants.map((applicant) => (
          <div key={applicant.id} className="border shadow p-6 space-y-12">
            <section id="candidate-details">
              <h4 className="font-semibold text-slate-700 underline">
                Applicant Details
              </h4>
              <table>
                <tbody>
                  <tr>
                    <td>Title:</td>
                    <td>{applicant.jobSeeker.title}</td>
                  </tr>
                  <tr>
                    <td>First Name:</td>
                    <td>{applicant.jobSeeker.firstName}</td>
                  </tr>
                  <tr>
                    <td>Last Name:</td>
                    <td>{applicant.jobSeeker.lastName}</td>
                  </tr>
                  {applicant.jobSeeker.middleName && (
                    <tr>
                      <td>Other Name(s):</td>
                      <td>{applicant.jobSeeker.middleName}</td>
                    </tr>
                  )}
                  <tr>
                    <td>Email:</td>
                    <td>
                      <a
                        href={`mailto: ${applicant.jobSeeker.email}`}
                        className="hover:underline"
                      >
                        {applicant.jobSeeker.email}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section id="cv" className="space-y-3">
              <h4 className="font-semibold text-slate-700 underline">
                Curriculum Vitae (CV)
              </h4>
              <FileView filePath={applicant.cv.document.url} />
            </section>

            <section id="cover-letter" className="space-y-3">
              <h4 className="font-semibold text-slate-700 underline">
                Cover Letter
              </h4>
              <FileView filePath={applicant.coverLetter.url} />
            </section>

            <section id="other-documents" className="space-y-3">
              <h4 className="font-semibold text-slate-700 underline">
                Additional Documents
              </h4>

              <div className="flex gap-4">
                {applicant.documents.map((doc) => (
                  <Link
                    key={doc.document.id}
                    title="Click to preview"
                    className="flex border p-2 text-foreground flex-col"
                    href={`?preview=${encodeURI(doc.document.url)}`}
                  >
                    <DocumentIcon type={doc.document.type} size={96} />
                    <small>{doc.document.name}</small>
                  </Link>
                ))}
              </div>
            </section>

            <section id="ai-evaluation" className="space-y-3">
              <h4 className="font-semibold text-slate-700 underline">
                AI Evaluation
              </h4>

              {applicant.evaluatedAt ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Match Score:</span>
                    <Chip
                      color={
                        (applicant.matchScore ?? 0) >= 70
                          ? "success"
                          : (applicant.matchScore ?? 0) >= 40
                          ? "warning"
                          : "danger"
                      }
                      variant="flat"
                    >
                      {applicant.matchScore}%
                    </Chip>
                  </div>

                  {applicant.summary && (
                    <p className="text-sm text-slate-600">
                      {applicant.summary}
                    </p>
                  )}

                  {applicant.strengths.length > 0 && (
                    <div>
                      <p className="font-medium text-sm">Strengths</p>
                      <ul className="list-disc list-inside text-sm text-slate-600">
                        {applicant.strengths.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {applicant.missingQualifications.length > 0 && (
                    <div>
                      <p className="font-medium text-sm">
                        Missing Qualifications
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-600">
                        {applicant.missingQualifications.map(
                          (qualification, index) => (
                            <li key={index}>{qualification}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <p className="text-sm text-slate-500">
                    AI evaluation pending
                  </p>
                  <EvaluateButton applicationId={applicant.id} />
                </div>
              )}
            </section>

            <section id="controls" className="flex justify-between">
              <Paging
                pageCount={total}
                meta={{ ...meta, l: 1, skip, total } as GridPaginateMeta}
              />

              <ChangeStatusButton
                nav={[
                  {
                    key: "status",
                    value: applicant.status,
                  },
                  {
                    key: "id",
                    value: applicant.id,
                  },
                ]}
                size="lg"
                color="success"
                role={admin.role}
                title="Change Applicant Status"
              >
                <ChangeApplicantStatus />
              </ChangeStatusButton>
            </section>
          </div>
        ))
      )}
    </div>
  );
}
