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
import { Chip } from "@nextui-org/react";
import { Icon } from "@/lib/frontend/icons";

type ApplyFormProps = {
  vacancyId: string;
  jobSeekerId: string;
};

export default function ApplyForm({ vacancyId, jobSeekerId }: ApplyFormProps) {
  const { navigate } = useNavigation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JobApplication>({
    defaultValues: {
      jobSeekerId,
      otherDocumentsId: [],
      vacancyId: vacancyId,
    },
    resolver: zodResolver(JobApplicationSchema),
    mode: "onChange",
  });

  const cvId = watch("cvId");
  const coverLetterId = watch("coverLetterId");
  const otherDocumentsId = watch("otherDocumentsId");

  const cvSelected = !!cvId;
  const coverLetterSelected = !!coverLetterId;
  const otherDocsSelected = Array.isArray(otherDocumentsId) && otherDocumentsId.length > 0;
  const canSubmit = cvSelected && coverLetterSelected;

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
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Instructions Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
          <Icon name="AlertCircleIcon" size={20} />
          How to Submit Your Application
        </h3>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li><strong>Upload your CV</strong> (Curriculum Vitae/Resume)</li>
          <li><strong>Upload a Cover Letter</strong></li>
          <li><strong>Select documents</strong> by clicking on them below</li>
          <li>Click <strong>&quot;Submit Application&quot;</strong> button when ready</li>
        </ol>
      </div>

      {/* Progress/Checklist */}
      <div className="bg-slate-50 p-4 rounded border border-slate-200">
        <p className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Icon name="CheckCircleIcon" size={18} className="text-slate-600" />
          Application Progress
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {cvSelected ? <Icon name="CheckIcon" size={16} className="text-success" /> : <Icon name="XIcon" size={16} className="text-slate-300" />}
              CV Selected
            </span>
            {cvSelected && <Chip size="sm" color="success" variant="flat">Done</Chip>}
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {coverLetterSelected ? <Icon name="CheckIcon" size={16} className="text-success" /> : <Icon name="XIcon" size={16} className="text-slate-300" />}
              Cover Letter Selected
            </span>
            {coverLetterSelected && <Chip size="sm" color="success" variant="flat">Done</Chip>}
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {otherDocsSelected ? <Icon name="CheckIcon" size={16} className="text-warning" /> : <Icon name="InfoIcon" size={16} className="text-slate-300" />}
              Other Documents
            </span>
            {otherDocsSelected && <Chip size="sm" color="warning" variant="flat">Optional</Chip>}
          </div>
        </div>
      </div>

      {/* Required Documents Section */}
      <div className="space-y-4">
        <h4 className="font-bold text-slate-800 flex items-center gap-2">
          📄 Required Documents
          <Chip size="sm" color="danger" variant="flat">Must Complete</Chip>
        </h4>

        {/* CV Section */}
        <section className={`p-6 border-2 rounded-lg transition-colors ${
          cvSelected ? "border-success bg-success bg-opacity-5" : errors.cvId ? "border-danger bg-danger bg-opacity-5" : "border-slate-300 bg-slate-50"
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <Icon name="FileIcon" size={20} className={cvSelected ? "text-success" : errors.cvId ? "text-danger" : "text-slate-400"} />
            <span className="font-semibold text-slate-800">Your CV (Curriculum Vitae)</span>
            <Chip size="sm" color={cvSelected ? "success" : "danger"} variant="flat">
              {cvSelected ? "✓ Selected" : "Required"}
            </Chip>
          </div>
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

        {/* Cover Letter Section */}
        <section className={`p-6 border-2 rounded-lg transition-colors ${
          coverLetterSelected ? "border-success bg-success bg-opacity-5" : errors.coverLetterId ? "border-danger bg-danger bg-opacity-5" : "border-slate-300 bg-slate-50"
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <Icon name="FileIcon" size={20} className={coverLetterSelected ? "text-success" : errors.coverLetterId ? "text-danger" : "text-slate-400"} />
            <span className="font-semibold text-slate-800">Cover Letter</span>
            <Chip size="sm" color={coverLetterSelected ? "success" : "danger"} variant="flat">
              {coverLetterSelected ? "✓ Selected" : "Required"}
            </Chip>
          </div>
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
      </div>

      {/* Optional Documents Section */}
      <div className="space-y-4">
        <h4 className="font-bold text-slate-800 flex items-center gap-2">
          📎 Supporting Documents (Optional)
          <Chip size="sm" color="default" variant="flat">Optional</Chip>
        </h4>

        <section className={`p-6 border-2 rounded-lg transition-colors ${
          otherDocsSelected ? "border-warning bg-warning bg-opacity-5" : "border-slate-300 bg-slate-50"
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <Icon name="PaperclipIcon" size={20} className={otherDocsSelected ? "text-warning" : "text-slate-400"} />
            <span className="font-semibold text-slate-800">Additional Documents</span>
            {otherDocsSelected && <Chip size="sm" color="warning" variant="flat">{otherDocumentsId.length} Added</Chip>}
          </div>
          <p className="text-xs text-slate-600 mb-3">Certificates, licenses, references, or other supporting documents</p>
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
      </div>

      {/* Submit Section */}
      <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-3">
        {!canSubmit && (
          <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm text-amber-800 flex items-start gap-2">
            <Icon name="AlertCircleIcon" size={18} className="mt-0.5 flex-shrink-0" />
            <div>
              <strong>Before you can submit:</strong>
              <ul className="list-disc list-inside mt-1 text-xs">
                {!cvSelected && <li>Select your CV</li>}
                {!coverLetterSelected && <li>Select your Cover Letter</li>}
              </ul>
            </div>
          </div>
        )}

        {canSubmit && (
          <div className="bg-success bg-opacity-10 border border-success rounded p-3 text-sm text-success-700 flex items-center gap-2">
            <Icon name="CheckCircleIcon" size={18} />
            ✓ Ready to submit! All required documents are selected.
          </div>
        )}

        <div className="flex justify-end gap-3">
          <SubmitButton
            isDisabled={!canSubmit || isSubmitting}
            isLoading={isSubmitting}
            className="font-bold tracking-wide"
          >
            {!canSubmit ? "Select Documents to Submit" : "Submit Application"}
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
