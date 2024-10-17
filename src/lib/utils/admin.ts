"use server";

import { auth } from "@clerk/nextjs/server";

export const isAdmin = () => {
  const permissions = auth().sessionClaims?.metadata.permissions;
  return (permissions?.length ?? 0) > 0;
};
