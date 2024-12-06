"use client";

import Popup from "@/components/system/popup";
import VerbPopup from "@/components/system/verb-popup";
import React, { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailField, InputField } from "@/components/custom";
import { AddEditStaff, AddEditStaffSchema } from "../_lib/schema";

type StaffModalProps = {
  verb: "Create" | "Edit";
  defaultValues?: AddEditStaff;
  onSubmit: (data: AddEditStaff) => void;
};

export default function StaffModal({
  verb,
  onSubmit,
  defaultValues,
}: StaffModalProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddEditStaff>({
    defaultValues,
    resolver: zodResolver(AddEditStaffSchema),
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
      <Popup.Header>{verb} Staff</Popup.Header>

      <Popup.Body>
        <EmailField
          autoFocus={true}
          label="Email address"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register("email")}
        />

        <section id="name" className="space-y-1">
          <h5 className="text-sm font-semibold text-slate-600">Name</h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              isInvalid={!!errors.firstName}
              errorMessage={errors.firstName?.message}
              {...register("firstName")}
            />

            <InputField
              label="Last Name"
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName?.message}
              {...register("lastName")}
            />

            <InputField
              label="Other Name(s)"
              isInvalid={!!errors.middleName}
              errorMessage={errors.middleName?.message}
              {...register("middleName")}
            />

            <InputField
              label="Title"
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message}
              list="title-list"
              {...register("title")}
            />
            <datalist id="title-list">
              {["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Rev.", "Fr."].map(
                (value, i) => (
                  <option key={`title_${i}`} value={value} />
                )
              )}
            </datalist>
          </div>
        </section>

        <section id="employment-details" className="space-y-1">
          <h5 className="text-sm font-semibold text-slate-600">
            Employment details
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Designation"
              isInvalid={!!errors.designation}
              errorMessage={errors.designation?.message}
              {...register("designation")}
            />
            <InputField
              label="Department"
              isInvalid={!!errors.department}
              errorMessage={errors.department?.message}
              {...register("department")}
            />

            <InputField
              label="Unit"
              isInvalid={!!errors.unit}
              errorMessage={errors.unit?.message}
              {...register("unit")}
            />
            <InputField
              label="Division"
              isInvalid={!!errors.division}
              errorMessage={errors.division?.message}
              {...register("division")}
            />
          </div>
        </section>
      </Popup.Body>

      <Popup.Footer>
        <Popup.CancelButton />

        <Popup.Button
          isLoading={isSubmitting}
          color="success"
          className="font-semibold"
          type="submit"
        >
          {verb} Staff
        </Popup.Button>
      </Popup.Footer>
    </VerbPopup>
  );
}
