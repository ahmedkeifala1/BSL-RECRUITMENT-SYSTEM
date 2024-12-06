"use client";

import Popup from "@/components/system/popup";
import VerbPopup from "@/components/system/verb-popup";
import React, { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { AddEditVacancy, AddEditVacancySchema } from "../_lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/custom";
import { SelectItemField } from "@/components/system/select-item-field";
import { EmploymentType } from "@prisma/client";
import SelectJobField from "../../jobs/components/select-job-field";

type VacancyModalProps = {
  verb: "Create" | "Edit";
  defaultValues?: AddEditVacancy;
  onSubmit: (data: AddEditVacancy) => void;
};

export default function VacancyModal({
  verb,
  onSubmit,
  defaultValues,
}: VacancyModalProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddEditVacancy>({
    defaultValues,
    resolver: zodResolver(AddEditVacancySchema),
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
      <Popup.Header>{verb} Vacancy</Popup.Header>

      <Popup.Body>
        <InputField
          label="Vacancy profession"
          autoFocus={true}
          isInvalid={!!errors.profession}
          errorMessage={errors.profession?.message}
          {...register("profession")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Vacancy role type"
            isInvalid={!!errors.roleType}
            errorMessage={errors.roleType?.message}
            {...register("roleType")}
          />

          <InputField
            type="date"
            label="Vacancy deadline"
            isInvalid={!!errors.deadline}
            errorMessage={errors.deadline?.message}
            {...register("deadline")}
          />
        </div>

        <SelectItemField
          source={EmploymentType}
          props={{
            label: "Employment type",
            isInvalid: !!errors.employmentType,
            errorMessage: errors.employmentType?.message,
            ...register("employmentType"),
          }}
        />

        <SelectJobField
          props={{
            label: "Select job",
            isInvalid: !!errors.jobId,
            errorMessage: errors.jobId?.message,
            ...register("jobId"),
          }}
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
          {verb} Vacancy
        </Popup.Button>
      </Popup.Footer>
    </VerbPopup>
  );
}
