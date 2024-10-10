"use client";

import { PermissionDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";

export const usePermissions = (userId: string) => {
  return useSWR(["permissions", userId], (keys) => {
    return IFetch<PermissionDto[]>({
      url: `/api/User/${userId}/permissions`,
      config: {
        method: "GET",
      },
    }).then((res) => {
      if (Array.isArray(res)) return res;

      throw res;
    });
  });
};
