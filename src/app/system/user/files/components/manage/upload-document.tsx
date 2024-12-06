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

export default function UploadDocument({ id }: { id: string }) {
  const { route, searchParams } = useNavigation();
  const show = searchParams.get("v") === "upload" && !!id;
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UploadJobSeekerDocument>({
    defaultValues: { jobSeekerId: id },
    resolver: zodResolver(UploadJobSeekerDocumentSchema),
  });

  async function onSubmit(data: UploadJobSeekerDocument) {
    const res = await uploadFile(toFormData(data));

    if (res.isSuccess) {
      route();
    }

    toast(res.message, { type: res.isSuccess ? "success" : "error" });
  }

  useLayoutEffect(() => {
    if (!show) {
      reset();
    }
  }, [show, reset]);

  return (
    show && (
      <VerbPopup verb="upload" as="form" onSubmit={handleSubmit(onSubmit)}>
        <Popup.Header>Upload file</Popup.Header>

        <Popup.Body>
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
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            {...register("name")}
          />
        </Popup.Body>

        <Popup.Footer>
          <Popup.CancelButton />

          <Popup.SubmitButton isLoading={isSubmitting}>
            Upload File
          </Popup.SubmitButton>
        </Popup.Footer>
      </VerbPopup>
    )
  );
}
