import { PermissionDto, RoleDto, SimpleUserDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import UserCard from "./user-card";
import { auth } from "@clerk/nextjs/server";

export default async function UserList() {
  const allPermissions = await IFetch<PermissionDto[]>({
    url: "/api/Permissions",
    config: {
      method: "GET",
      next: {
        tags: ["permissions"],
      },
    },
  }).then((res) => {
    if (Array.isArray(res)) return res;

    throw res;
  });

  const allRoles = await IFetch<RoleDto[]>({
    url: "/api/Permissions/Roles",
    config: {
      method: "GET",
      next: {
        tags: ["roles"],
      },
    },
  }).then((res) => {
    if (Array.isArray(res)) return res;

    throw res;
  });

  const users = await IFetch<SimpleUserDto[]>({
    url: "/api/User",
    config: {
      method: "GET",
      next: {
        tags: ["users"],
      },
    },
  }).then((res) => {
    if (Array.isArray(res)) return res;

    throw res;
  });

  const { sessionClaims } = auth();
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2.5">
      {users.map((user, index) => (
        <UserCard
          allRoles={allRoles}
          user={user}
          currentUserPermissions={sessionClaims?.metadata.permissions ?? []}
          key={index}
          allPermissions={allPermissions ?? []}
        />
      ))}
    </div>
  );
}
