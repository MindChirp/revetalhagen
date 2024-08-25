import { PermissionDto, SimpleUserDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import UserCard from "./user-card";

export default async function UserList() {
  const allPermissions = await IFetch<PermissionDto[]>({
    url: "/api/Permissions",
    config: {
      method: "GET",
      next: {
        tags: ["permissions"],
      },
    },
  });

  const users = await IFetch<SimpleUserDto[]>({
    url: "/api/User",
    config: {
      method: "GET",
      next: {
        tags: ["users"],
      },
    },
  });
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2.5">
      {users.map((user, index) => (
        <UserCard
          user={user}
          key={index}
          allPermissions={allPermissions ?? []}
        />
      ))}
    </div>
  );
}
