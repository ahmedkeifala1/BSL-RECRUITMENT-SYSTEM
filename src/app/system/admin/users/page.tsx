import React from "react";
import Header from "../../components/header";
import Toolkit from "../../components/datagrid/toolkit";
import { getResponseData } from "@/lib/shared/utils";
import { getPaginatedParams } from "@/lib/frontend/utils";
import { ListProps } from "@/lib/shared/types";
import { listUsers } from "./_lib/actions";
import ChangeUserStatus from "./components/change-user-status";
import ResetUserPassword from "./components/reset-user-password";
import UsersList from "./components/admins-list";
import { getLoggedUser } from "@/app/auth/_lib/actions";

type UsersPageProps = ListProps;

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const user = getResponseData(await getLoggedUser());
  const { skip, ...meta } = getPaginatedParams(searchParams);
  const [total, usersData] = await listUsers({
    where: {
      id: {
        not: user.id,
      },
      OR: !meta.q
        ? undefined
        : [
            {
              fullName: {
                mode: "insensitive",
                contains: meta.q,
              },
            },
            {
              email: {
                mode: "insensitive",
                contains: meta.q,
              },
            },
          ],
    },
  });
  const users = getResponseData(usersData, []);

  return (
    <>
      <div className="flex-1 flex flex-col gap-3">
        <Header title="Users" description="Manage user accounts" />

        <Toolkit />

        <div className="flex-1">
          <UsersList users={users} meta={{ ...meta, skip, total }} />
        </div>
      </div>

      <ChangeUserStatus />

      <ResetUserPassword />
    </>
  );
}
