"use client";

import DynamicSelectField, {
  ISelectDynamicProps,
} from "@/components/system/dynamic-select-field";
import { Prisma } from "@prisma/client";
import { getSelectStaff } from "../_lib/actions";

type SelectStaffFieldProps = ISelectDynamicProps<"staff"> & {
  where?: Prisma.StaffWhereInput;
};

export default function SelectStaffField({
  where,
  ...props
}: Readonly<SelectStaffFieldProps>) {
  return (
    <DynamicSelectField<"staff">
      {...props}
      queryFn={getSelectStaff}
      queryKey={["select-staffs"]}
      params={{ where: { ...where, admin_details: null } }}
    />
  );
}
