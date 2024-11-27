import { redirect } from "next/navigation";
import { getLoggedUser } from "../_lib/actions";
import { getLoggedAdmin } from "@/app/system/(admins)/_lib/actions";

export default async function AuthGateway() {
  const logged = await getLoggedUser();

  if (!logged.data || logged.isFailure) {
    switch (logged.code) {
      case 403:
        return redirect("/auth/verify-email");
      case 423:
        return redirect("/auth/locked");
      case 401:
      default:
        return redirect("/auth");
    }
  } else if (logged.data.userType === "Admin") {
    const admin = await getLoggedAdmin(logged.data.id);

    if (!admin.data || admin.isFailure) {
      return redirect("/auth");
    }

    return redirect(`/system/${admin.data.role.toLowerCase()}`);
  }

  return redirect(`/system/${logged.data?.userType?.toLowerCase()}`);
}
