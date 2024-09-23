"use client";

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
import { PermissionDto, RoleDto, SimpleUserDto } from "@/lib/api";
import { GavelIcon, LockKeyholeIcon } from "lucide-react";
import PermissionsDialog from "./permissions-dialog";
import { motion } from "framer-motion";
import Conditional from "@/components/ui/conditional";
import { hasPermissions, PERMISSIONS } from "@/lib/utils";
import { useMemo } from "react";

interface UserCardProps {
  user: SimpleUserDto;
  allPermissions: PermissionDto[];
  currentUserPermissions: string[];
  allRoles: RoleDto[];
}

export default function UserCard({
  user,
  allPermissions,
  currentUserPermissions,
  allRoles,
}: UserCardProps) {
  const allowSetPermissions = useMemo(() => {
    return hasPermissions(
      currentUserPermissions,
      [
        PERMISSIONS.updateUserPermissions,
        PERMISSIONS.getRoles,
        PERMISSIONS.getPermissions,
      ],
      true
    );
  }, [currentUserPermissions]);
  return (
    <motion.div
      className="w-full h-full"
      initial={{
        scale: 0.7,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        bounce: 0.25,
        type: "spring",
      }}
    >
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
                  className="w-fit [&:only-child]:w-full flex gap-2.5"
                  disabled
                >
                  <GavelIcon size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bannlys</TooltipContent>
            </Tooltip>
            <Conditional render={allowSetPermissions}>
              <PermissionsDialog
                userPermissions={currentUserPermissions}
                user={user}
                allPermissions={allPermissions}
                allRoles={allRoles}
              >
                <Button className="w-full flex gap-2.5">
                  <LockKeyholeIcon size={16} />
                  Rettigheter
                </Button>
              </PermissionsDialog>
            </Conditional>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
