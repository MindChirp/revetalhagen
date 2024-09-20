import { PermissionDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import useSWR from "swr";

export const usePermissions = (userId: string) => {
  return useSWR(["permissions", userId], (keys) => {
    return IFetch<PermissionDto[]>({
      url: `/api/User/${userId}/permissions`,
      config: {
        method: "GET",
      },
    });
  });
};
