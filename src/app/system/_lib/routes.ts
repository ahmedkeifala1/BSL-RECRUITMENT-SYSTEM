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
  // {
  //   title: "Logs",
  //   icon: "LogsIcon",
  //   href: "/logs",
  // },
];

const ManagerRoutes: Route[] = [
  {
    title: "Vacancies",
    icon: "BriefcaseBusinessIcon",
    href: "/vacancies",
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
    title: "Vacancies",
    icon: "BriefcaseBusinessIcon",
    href: "/vacancies",
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

const JobSeekerRoutes: Route[] = [
  {
    title: "Files",
    icon: "FilesIcon",
    href: "/files",
  },
];

type UserRole = AdminRole | "User";

export default function getRoutes(role: UserRole) {
  switch (role) {
    case "Admin":
      return AdminRoutes;
    case "Manager":
      return ManagerRoutes;
    case "Director":
      return DirectorRoutes;
    case "User":
      return JobSeekerRoutes;
    default:
      return [] as Route[];
  }
}
