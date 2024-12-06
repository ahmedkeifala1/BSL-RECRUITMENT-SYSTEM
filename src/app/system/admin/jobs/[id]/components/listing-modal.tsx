import React, { useLayoutEffect, useState } from "react";
import { AddEditListing, AddEditListingSchema } from "../_lib/schema";
import VerbPopup from "@/components/system/verb-popup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Popup from "@/components/system/popup";
import { IconButton, InputField } from "@/components/custom";
import { JobListingType } from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import { numberToSelectItemArray } from "@/lib/frontend/utils";
import { pluralise } from "@/lib/shared/utils";

type ListingModalProps = {
  verb: JobListingType;
  action: "Add" | "Edit";
  defaultValues: AddEditListing;
  onSubmit: (data: AddEditListing) => void;
};

export default function ListingModal({
  verb,
  action,
  onSubmit,
  defaultValues,
}: ListingModalProps) {
  const [fields, setFields] = useState<number[]>(() =>
    numberToSelectItemArray(defaultValues?.requirements?.length ?? 1).map(
      (v) => v.key
    )
  );
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddEditListing>({
    defaultValues: { ...defaultValues, type: verb },
    resolver: zodResolver(AddEditListingSchema),
  });

  useLayoutEffect(() => reset(), [reset]);

  return (
    <VerbPopup
      as="form"
      size="xl"
      verb={verb}
      action={action.toLowerCase()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Popup.Header>
        {action} Job {verb}
      </Popup.Header>

      <Popup.Body>
        <InputField
          autoFocus={true}
          label={`${verb} description`}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          {...register("name")}
        />

        <section id="requirements" className="space-y-1">
          <h5 className="text-sm font-semibold text-slate-700">
            Required {pluralise(verb).toLowerCase()}
          </h5>

          <fieldset className="space-y-2 pb-3">
            {fields.map((_, i) => (
              <InputField
                key={`field_${i}`}
                label={`${verb} ${i + 1}`}
                classNames={{
                  inputWrapper: "pr-1",
                }}
                endContent={
                  i > 0 && (
                    <IconButton
                      color="danger"
                      variant="light"
                      isIconOnly={true}
                      tabIndex={-1}
                      onDoubleClick={() =>
                        setFields((pre) => pre.filter((_, idx) => i !== idx))
                      }
                    >
                      <Trash2Icon size={13} />
                    </IconButton>
                  )
                }
                isInvalid={!!errors.requirements}
                errorMessage={errors.requirements?.message}
                {...register(`requirements.${i}`)}
              />
            ))}
          </fieldset>

          <IconButton
            variant="solid"
            color="primary"
            isIconOnly={false}
            onPress={() => setFields((pre) => [...pre, 1])}
          >
            Add requirement
          </IconButton>
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
          {action} {verb}
        </Popup.Button>
      </Popup.Footer>
    </VerbPopup>
  );
}
