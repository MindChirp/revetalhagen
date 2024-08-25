"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Typography from "@/components/ui/typography";
import { PermissionDto, SimpleUserDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import React from "react";

interface PermissionsDialogProps {
  children: React.ReactNode;
  user: SimpleUserDto;
  allPermissions: PermissionDto[];
}

export default function PermissionsDialog({
  children,
  allPermissions,
  user,
}: PermissionsDialogProps) {
  // const userPermissions = await IFetch<string[]>({
  //   url:
  // })
  const [userPermissions, setUserPermissions] = React.useState<string[]>([
    "create:article",
    "edit:article",
    "delete:article",
    "update:bookable_item",
    "delete:bookable_item",
    "create:bookable_item",
    "create:bookable_item_category",
    "delete:bookable_item_category",
  ]);

  const setPermissions = () => {
    IFetch({
      url: `/api/User/${user.id}/permissions`,
      config: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPermissions),
      },
    });
  };

  const removePermission = (id: number) => {};
  const addPermission = (id: number) => {};

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rettigheter for @{user.username}</DialogTitle>
          <DialogDescription>
            Fjern eller legg til tilgang for ulike funksjoner
          </DialogDescription>
        </DialogHeader>

        <Typography variant="small">Fjern</Typography>
        <div className="w-full flex gap-2.5 flex-wrap">
          {userPermissions.map((permission, index) => (
            <Tooltip key={index}>
              <TooltipTrigger>
                <Badge variant="secondary" className="w-fit">
                  {
                    allPermissions.find((p) => p.title === permission)
                      ?.description
                  }
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Trykk for å fjerne tilgang</TooltipContent>
            </Tooltip>
          ))}
        </div>
        <Separator orientation="horizontal" />
        <Typography variant="small">Legg til</Typography>

        <div className="w-full flex gap-2.5 flex-wrap">
          {allPermissions
            .filter((p) => !userPermissions.includes(p.title ?? ""))
            .map((permission, index) => (
              <Tooltip key={index}>
                <TooltipTrigger>
                  <Badge variant="secondary" className="w-fit">
                    {permission.description}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Trykk for å legge til tilgang</TooltipContent>
              </Tooltip>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
