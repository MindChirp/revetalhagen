"use server";

import { Roles } from "@/types/globals";
import { auth } from "@clerk/nextjs/server";
import { redirect, RedirectType } from "next/navigation";
import { routes } from "./routes";

/** Deprecated */
// export async function requireRole(role: Roles) {
//   const { sessionClaims } = auth();

//   if (sessionClaims?.metadata.role !== role) {
//     redirect(routes.LANDING, RedirectType.replace);
//   }
// }

export async function requireHeightenedPriveleges() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.permissions?.length === 0) {
    redirect(routes.LANDING, RedirectType.replace);
  }
}

export async function isRole(role: Roles) {
  const { sessionClaims } = auth();
  if (sessionClaims?.metadata.role == role) {
    return true;
  }
  return false;
}

export type Permissions =
  | "create:bookable_item"
  | "delete:bookable_item"
  | "update:bookable_item"
  | "create:bookable_item_category"
  | "delete:bookable_item_category"
  | "create:article"
  | "edit:article"
  | "delete:article"
  | "get:roles"
  | "get:permissions"
  | "update:user-permissions";
