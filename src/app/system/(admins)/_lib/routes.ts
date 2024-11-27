import { AdminRole } from "@prisma/client";
import { Route } from "./schema";

const AdminRoutes: Route[] = [
  {
    title: "Users",
    icon: "UsersIcon",
    href: "/users",
  },
  {
    title: "Admins",
    icon: "Users2Icon",
    href: "/admins",
  },
  {
    title: "Logs",
    icon: "LogsIcon",
    href: "/logs",
  },
];

const ManagerRoutes: Route[] = [
  {
    title: "Adverts",
    icon: "BriefcaseBusinessIcon",
    href: "/adverts",
  },
  {
    title: "Jobs",
    icon: "BriefcaseIcon",
    href: "/jobs",
  },
  {
    title: "Staff",
    icon: "UsersIcon",
    href: "/staff",
  },
];

const DirectorRoutes: Route[] = [
  {
    title: "Candidates",
    icon: "Users2Icon",
    href: "/candidates",
  },
  {
    title: "Adverts",
    icon: "BriefcaseBusinessIcon",
    href: "/adverts",
  },
  {
    title: "Jobs",
    icon: "BriefcaseIcon",
    href: "/jobs",
  },
  {
    title: "Staff",
    icon: "UsersIcon",
    href: "/staff",
  },
];

export default function GetRoutes(role: AdminRole) {
  switch (role) {
    case "Admin":
      return AdminRoutes;
    case "Manager":
      return ManagerRoutes;
    case "Director":
      return DirectorRoutes;
    default:
      return [] as Route[];
  }
}
