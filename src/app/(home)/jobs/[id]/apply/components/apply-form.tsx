"use client";

import React from "react";
import { JobApplication, JobApplicationSchema } from "../_lib/schema";
import SelectDocument from "@/app/system/user/files/components/select-document";
import { SubmitButton } from "@/components/custom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createApplication } from "../_lib/actions";
import { toast } from "react-toastify";
import useNavigation from "@/lib/frontend/hooks/navigation-hook";

type ApplyFormProps = {
  vacancyId: string;
  jobSeekerId: string;
};

export default function ApplyForm({ vacancyId, jobSeekerId }: ApplyFormProps) {
  const { navigate } = useNavigation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JobApplication>({
    defaultValues: {
      jobSeekerId,
      otherDocumentsId: [],
      vacancyId: vacancyId,
    },
    resolver: zodResolver(JobApplicationSchema),
  });

  async function onSubmit(data: JobApplication) {
    const res = await createApplication(data);

    if (res.isSuccess) {
      return navigate([
        {
          key: "m",
          value: "success",
        },
      ]);
    }

    toast.error(res.message);
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <section id="cv" className="p-6 border shadow">
        <SelectDocument
          type="radio"
          props={{
            title: "Select/Upload CV",
            ...register("cvId"),
          }}
          invalid={{
            isInvalid: !!errors.cvId,
            errorMessage: errors.cvId?.message,
          }}
          where={{
            type: "Curriculum_Vitae",
          }}
          jobSeekerId={jobSeekerId}
        />
      </section>

      <section id="cover-letter" className="p-6 border shadow">
        <SelectDocument
          type="radio"
          valueKey="documentId"
          where={{
            type: "Cover_Letter",
          }}
          props={{
            title: "Select/Upload Cover Letter",
            ...register("coverLetterId"),
          }}
          invalid={{
            isInvalid: !!errors.coverLetterId,
            errorMessage: errors.coverLetterId?.message,
          }}
          jobSeekerId={jobSeekerId}
        />
      </section>

      <section id="other-documents" className="p-6 border shadow">
        <SelectDocument
          type="checkbox"
          props={{
            title: "Select/Upload Other Documents",
            ...register("otherDocumentsId"),
          }}
          invalid={{
            isInvalid: !!errors.otherDocumentsId,
            errorMessage: errors.otherDocumentsId?.message,
          }}
          where={{
            type: {
              notIn: ["Cover_Letter", "Curriculum_Vitae"],
            },
          }}
          valueKey="documentId"
          jobSeekerId={jobSeekerId}
        />
      </section>

      <div className="flex justify-end">
        <SubmitButton
          isLoading={isSubmitting}
          className="font-bold tracking-wide"
        >
          Submit application
        </SubmitButton>
      </div>
    </form>
  );
}
