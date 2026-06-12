"use client";

import useNavigation from "@/lib/frontend/hooks/navigation-hook";
import React, { useLayoutEffect } from "react";
import VerbPopup from "@/components/system/verb-popup";
import Popup from "@/components/system/popup";
import { SelectItemField } from "@/components/system/select-item-field";
import { JobSeekerDocumentType } from "@prisma/client";
import { InputField } from "@/components/custom";
import { useForm } from "react-hook-form";
import {
  UploadJobSeekerDocument,
  UploadJobSeekerDocumentSchema,
} from "../../_lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadFile } from "../../_lib/actions";
import { toast } from "react-toastify";
import FileUpload from "../../../../components/file-upload";
import { toFormData } from "@/lib/frontend/utils";
import { Progress } from "@nextui-org/react";

export default function UploadDocument({ id }: { id: string }) {
  const { route, searchParams } = useNavigation();
  const show = searchParams.get("v") === "upload" && !!id;
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UploadJobSeekerDocument>({
    defaultValues: { jobSeekerId: id },
    resolver: zodResolver(UploadJobSeekerDocumentSchema),
  });

  const fileValue = watch("file");

  async function onSubmit(data: UploadJobSeekerDocument) {
    setUploadProgress(0);
    const formData = toFormData(data);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 30;
      });
    }, 300);

    try {
      const res = await uploadFile(formData);
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (res.isSuccess) {
        // Store the document name and trigger refetch signal
        const docName = data.name;
        sessionStorage.setItem('lastUploadedDocument', docName);
        // Trigger immediate refetch by dispatching custom event
        window.dispatchEvent(new CustomEvent('documentUploaded', { detail: { docName } }));
        
        setTimeout(() => {
          route();
          setUploadProgress(0);
        }, 500);
      }

      toast(res.message, { type: res.isSuccess ? "success" : "error" });
    } catch (error) {
      clearInterval(progressInterval);
      setUploadProgress(0);
      toast.error("Upload failed");
    }
  }

  useLayoutEffect(() => {
    if (!show) {
      reset();
      setUploadProgress(0);
    }
  }, [show, reset]);

  return (
    show && (
      <VerbPopup verb="upload" as="form" onSubmit={handleSubmit(onSubmit)}>
        <Popup.Header>Upload Document</Popup.Header>

        <Popup.Body className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-sm font-semibold text-blue-900 mb-1">📋 Instructions:</p>
            <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
              <li>Upload only PDF or DOC/DOCX files</li>
              <li>Maximum file size is 5MB</li>
              <li>Select the document type (CV, Cover Letter, etc.)</li>
              <li>Give your document a clear name</li>
            </ul>
          </div>

          <FileUpload
            isInvalid={!!errors.file}
            errorMessage={errors.file?.message}
            setValue={(file) =>
              setValue("file", file as File, {
                shouldTouch: true,
                shouldValidate: true,
              })
            }
          />

          <SelectItemField<JobSeekerDocumentType>
            props={{
              label: "Document Type",
              isInvalid: !!errors.type,
              errorMessage: errors.type?.message,
              ...register("type"),
            }}
            source={JobSeekerDocumentType}
          />

          <InputField
            label="Document name"
            placeholder="e.g., My CV 2024"
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            {...register("name")}
          />

          {isSubmitting && uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">Uploading...</span>
                <span className="text-xs text-slate-500">{Math.round(uploadProgress)}%</span>
              </div>
              <Progress 
                value={uploadProgress} 
                className="w-full" 
                color="success"
              />
            </div>
          )}
        </Popup.Body>

        <Popup.Footer>
          <Popup.CancelButton />

          <Popup.SubmitButton isLoading={isSubmitting} isDisabled={!fileValue || isSubmitting}>
            {isSubmitting ? "Uploading..." : "Upload File"}
          </Popup.SubmitButton>
        </Popup.Footer>
      </VerbPopup>
    )
  );
}
