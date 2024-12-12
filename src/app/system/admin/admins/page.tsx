import React from "react";
import Header from "../../components/header";
import Toolkit from "../../components/datagrid/toolkit";
import { getResponseData } from "@/lib/shared/utils";
import { getPaginatedParams } from "@/lib/frontend/utils";
import { ListProps } from "@/lib/shared/types";
import { listAdmins } from "./_lib/actions";
import { getLoggedUser } from "@/app/auth/_lib/actions";
import NavActionButton from "@/components/system/nav-action-button";
import AdminsList from "./components/admins-list";
import AddAdmin from "./components/add-admin";
import ChangeRole from "./components/change-admin-role";
import DeleteAdmin from "./components/delete-admin";

type AdminsPageProps = ListProps;

export default async function AdminsPage({ searchParams }: AdminsPageProps) {
  const admin = getResponseData(await getLoggedUser());
  const { skip, ...meta } = getPaginatedParams(searchParams);
  const [total, adminsData] = await listAdmins({
    where: {
      staff: {
        email: { not: admin.email },
        OR: !meta.q
          ? undefined
          : [
              {
                email: {
                  mode: "insensitive",
                  contains: meta.q,
                },
              },
              {
                fullName: {
                  mode: "insensitive",
                  contains: meta.q,
                },
              },
            ],
      },
    },
  });
  const admins = getResponseData(adminsData, []);

  return (
    <>
      <div className="flex-1 flex flex-col gap-3">
        <Header title="Admins" description="Manage system admins">
          <NavActionButton
            nav={[
              {
                key: "v",
                value: "create",
              },
            ]}
            variant="solid"
          >
            Add New
          </NavActionButton>
        </Header>

        <Toolkit />

        <div className="flex-1">
          <AdminsList admins={admins} meta={{ ...meta, skip, total }} />
        </div>
      </div>

      <AddAdmin />

      <ChangeRole />

      <DeleteAdmin />
    </>
  );
}
