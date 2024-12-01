"use client";

import DynamicSelectField, {
  ISelectDynamicProps,
} from "@/components/system/dynamic-select-field";
import { Prisma } from "@prisma/client";
import { getSelectJobs } from "../../_lib/actions";

type SelectCourseFieldProps = ISelectDynamicProps<"job"> & {
  where?: Prisma.JobWhereInput;
};

export default function SelectCourseField({
  where,
  ...props
}: Readonly<SelectCourseFieldProps>) {
  return (
    <DynamicSelectField<"job">
      {...props}
      params={{ where }}
      queryFn={getSelectJobs}
      queryKey={["select-jobs"]}
    />
  );
}
