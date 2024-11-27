"use client";

import Loader from "@/components/loader";
import { Admin, Staff } from "@prisma/client";
import { useLayoutEffect } from "react";
import { create } from "zustand";

type LoggedAdmin = Admin & {
  staff: Staff;
};

type LoggedAdminStore = {
  admin: LoggedAdmin;
  setAdmin: (admin: LoggedAdmin) => void;
};

export const useLoggedAdmin = create<LoggedAdminStore>((set) => ({
  admin: {} as LoggedAdmin,
  setAdmin(admin) {
    set((state) => ({ ...state, admin }));
  },
}));

export default function AdminProvider({
  admin,
  children,
}: {
  admin: LoggedAdmin;
  children: React.ReactNode;
}) {
  const { admin: cached, setAdmin } = useLoggedAdmin();

  useLayoutEffect(() => {
    setAdmin(admin);
  }, [admin, setAdmin]);

  return cached?.id ? children : <Loader message="Authenticating...." />;
}
