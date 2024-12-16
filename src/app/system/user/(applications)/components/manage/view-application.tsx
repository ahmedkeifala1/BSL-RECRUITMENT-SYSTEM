"use client";

import Popup from "@/components/system/popup";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getApplication } from "../../_lib/actions";
import DataLoader from "@/app/system/components/data-loader";
import { getResponseData } from "@/lib/shared/utils";
import JobDetails from "@/app/system/admin/jobs/[id]/components/job-details";
import FileView from "@/app/system/components/file-view";

export default function ViewApplication() {
  const { route, searchParams } = useNavigation();
  const show = searchParams.has("view");
  const id = searchParams.get("view") as string;
  const { data, isLoading, isFetching } = useQuery({
    enabled: show,
    queryKey: ["application", id],
    queryFn: () => getApplication({ id }),
  });
  const application = getResponseData(data);

  return (
    show && (
      <DataLoader isProcessing={isLoading || isFetching} response={data}>
        <Popup
          isOpen={show}
          hideCloseButton={true}
          onClose={() => route()}
          size="4xl"
          placement="top"
        >
          <Popup.Header>{application?.vacancy?.job?.title}</Popup.Header>

          <Popup.Body className="gap-4">
            {application && (
              <>
                <JobDetails job={application?.vacancy.job} />

                <section id="cv" className="space-y-2">
                  <h5 className="text-center font-bold text-xl">
                    Curriculum Vitae (<abbr title="Curriculum Vitae">CV</abbr>)
                  </h5>
                  <FileView filePath={application.cv.document.url} />
                </section>

                <section id="cover-letter" className="space-y-2">
                  <h5 className="text-center font-bold text-xl">
                    Cover Letter
                  </h5>

                  <FileView filePath={application.coverLetter.url} />
                </section>

                <section id="other-documents" className="space-y-2">
                  <h5 className="text-center font-bold text-xl">
                    Other Documents
                  </h5>
                </section>
              </>
            )}
          </Popup.Body>

          <Popup.Footer>
            <Popup.CancelButton />
          </Popup.Footer>
        </Popup>
      </DataLoader>
    )
  );
}
