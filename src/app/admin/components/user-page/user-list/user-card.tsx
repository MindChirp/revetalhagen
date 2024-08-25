import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserAvatar from "@/components/ui/header/user-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Typography from "@/components/ui/typography";
import { PermissionDto, SimpleUserDto } from "@/lib/api";
import { GavelIcon, LockKeyholeIcon } from "lucide-react";
import PermissionsDialog from "./permissions-dialog";

interface UserCardProps {
  user: SimpleUserDto;
  allPermissions: PermissionDto[];
}
export default function UserCard({ user, allPermissions }: UserCardProps) {
  return (
    <Card className="p-6 w-full border-border border border-solid shadow-none">
      <div className="flex flex-col w-full justify-center items-center gap-2.5">
        <div className="rounded-full shadow-md">
          <UserAvatar src={user.avatarUri ?? ""} className="w-20 h-20" />
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="p" className="!mt-0">
            {user.fullName}{" "}
          </Typography>
          <Badge>
            <Typography variant="small">@{user.username}</Typography>
          </Badge>
        </div>
        <div className="flex gap-2.5 w-full pt-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"destructive"}
                className="w-fit flex gap-2.5"
                disabled
              >
                <GavelIcon size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bannlys</TooltipContent>
          </Tooltip>
          <PermissionsDialog user={user} allPermissions={allPermissions}>
            <Button className="w-full flex gap-2.5">
              <LockKeyholeIcon size={16} />
              Rettigheter
            </Button>
          </PermissionsDialog>
        </div>
      </div>
    </Card>
  );
}
