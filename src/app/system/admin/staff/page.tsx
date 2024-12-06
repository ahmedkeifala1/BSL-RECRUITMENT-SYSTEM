import { getPaginatedParams } from "@/lib/frontend/utils";
import { ListProps } from "@/lib/shared/types";
import React from "react";
import { listStaff } from "./_lib/actions";
import { getResponseData } from "@/lib/shared/utils";
import Header from "../../components/header";
import NavActionButton from "@/components/system/nav-action-button";
import { PlusIcon } from "lucide-react";
import Toolkit from "../../components/datagrid/toolkit";
import StaffList from "./components/staff-list";
import AddStaff from "./components/manage/add-staff";
import EditStaff from "./components/manage/edit-staff";
import RemoveStaff from "./components/manage/remove-staff";

type StaffPageProps = ListProps;

export default async function StaffPage({ searchParams }: StaffPageProps) {
  const { skip, ...meta } = getPaginatedParams(searchParams);

  const [total, staffData] = await listStaff({
    skip,
    take: meta.l,
    where: {
      OR: !meta.q
        ? undefined
        : [
            {
              fullName: { mode: "insensitive", contains: meta.q },
            },
            {
              division: { mode: "insensitive", contains: meta.q },
            },
            {
              department: { mode: "insensitive", contains: meta.q },
            },
            {
              unit: { mode: "insensitive", contains: meta.q },
            },
            {
              designation: { mode: "insensitive", contains: meta.q },
            },
          ],
    },
  });
  const staff = getResponseData(staffData, []);

  return (
    <>
      <div className="space-y-4">
        <Header
          title="Staff"
          description="Manage all staff available in the institution"
        >
          <NavActionButton
            color="primary"
            variant="solid"
            className="gap-1 font-semibold"
            nav={[{ key: "v", value: "create" }]}
            startContent={<PlusIcon size={15} />}
          >
            New Staff
          </NavActionButton>
        </Header>

        <Toolkit />

        <div className="flex-1">
          <StaffList staff={staff} meta={{ ...meta, skip, total }} />
        </div>
      </div>

      <AddStaff />

      <EditStaff />

      <RemoveStaff />
    </>
  );
}
