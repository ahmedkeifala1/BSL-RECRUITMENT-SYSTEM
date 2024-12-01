"use client";

import Popup from "@/components/system/popup";
import VerbPopup from "@/components/system/verb-popup";
import React, { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { AddEditJob, AddEditJobSchema } from "../_lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/custom";
import { SelectItemField } from "@/components/system/select-item-field";
import { EmploymentType } from "@prisma/client";
import { Textarea } from "@nextui-org/react";

type JobModalProps = {
  verb: "Create" | "Edit";
  defaultValues?: AddEditJob;
  onSubmit: (data: AddEditJob) => void;
};

export default function JobModal({
  verb,
  onSubmit,
  defaultValues,
}: JobModalProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddEditJob>({
    defaultValues,
    resolver: zodResolver(AddEditJobSchema),
  });

  useLayoutEffect(() => reset(), [reset]);

  return (
    <VerbPopup
      action="v"
      as="form"
      size="xl"
      verb={verb.toLowerCase()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Popup.Header>{verb} Job</Popup.Header>

      <Popup.Body>
        <InputField
          label="Job title"
          autoFocus={true}
          isInvalid={!!errors.title}
          errorMessage={errors.title?.message}
          {...register("title")}
        />

        <SelectItemField
          source={EmploymentType}
          props={{
            label: "Employment type",
            isInvalid: !!errors.type,
            errorMessage: errors.type?.message,
            ...register("type"),
          }}
        />

        <Textarea
          variant="bordered"
          radius="none"
          placeholder="Job description"
          isInvalid={!!errors.description}
          errorMessage={errors.description?.message}
          {...register("description")}
        />
      </Popup.Body>

      <Popup.Footer>
        <Popup.CancelButton />

        <Popup.Button
          isLoading={isSubmitting}
          color="success"
          className="font-semibold"
          type="submit"
        >
          {verb} Job
        </Popup.Button>
      </Popup.Footer>
    </VerbPopup>
  );
}
