"use client";

import DynamicSelectField, {
  ISelectDynamicProps,
} from "@/components/system/dynamic-select-field";
import { Prisma } from "@prisma/client";
import { getSelectJobs } from "../_lib/actions";

type SelectJobFieldProps = ISelectDynamicProps<"job"> & {
  where?: Prisma.JobWhereInput;
};

export default function SelectJobField({
  where,
  ...props
}: Readonly<SelectJobFieldProps>) {
  return (
    <DynamicSelectField<"job">
      {...props}
      queryFn={getSelectJobs}
      queryKey={["select-jobs"]}
      params={{ where: { ...where, status: "Approved" } }}
    />
  );
}
