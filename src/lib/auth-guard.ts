import { auth } from "@clerk/nextjs/server";
import { redirect, RedirectType } from "next/navigation";
import { routes } from "./routes";
import { Roles } from "@/types/globals";

export function requireRole(role: Roles) {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== role) {
    redirect(routes.LANDING, RedirectType.replace);
  }
}
