"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Conditional from "@/components/ui/conditional";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loader from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Typography from "@/components/ui/typography";
import { useToast } from "@/components/ui/use-toast";
import { PermissionDto, RoleDto, SimpleUserDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import {
  AlertTriangleIcon,
  HistoryIcon,
  InfoIcon,
  SaveIcon,
  ToggleLeft,
} from "lucide-react";
import React, { useState } from "react";

interface PermissionsDialogProps {
  children: React.ReactNode;
  user: SimpleUserDto;
  allPermissions: PermissionDto[];
  allRoles: RoleDto[];
}

const exisingUserPermissions: PermissionDto[] = [];
export default function PermissionsDialog({
  children,
  allPermissions,
  user,
  allRoles,
}: PermissionsDialogProps) {
  // const userPermissions = await IFetch<string[]>({
  //   url:
  // })
  const { toast } = useToast();
  const [userPermissions, setUserPermissions] = useState<PermissionDto[]>(
    exisingUserPermissions
  );
  const [submitting, setSubmitting] = useState(false);

  const resetChanges = () => {
    setUserPermissions(exisingUserPermissions);
  };

  const setPermissions = () => {
    setSubmitting(true);
    IFetch({
      url: `/api/User/${user.username}/permissions`,
      config: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPermissions.map((p) => p.id)),
      },
    })
      .then(() => {
        toast({
          title: "Rettigheter oppdatert",
          description: `Rettigheter for bruker @${user.username} ble oppdatert`,
        });
      })
      .catch(() => {
        toast({
          title: "Noe gikk galt",
          description: `Rettigheter for bruker @${user.username} ble ikke oppdatert`,
          variant: "destructive",
        });
      })
      .finally(() => {
        setSubmitting(false);
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
                    allPermissions.find((p) => p.id === permission.id)
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
            .filter(
              (p) =>
                !userPermissions.some((permission) => permission.id === p.id)
            )
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
          <Conditional
            render={
              !Boolean(
                allPermissions.filter(
                  (p) =>
                    !userPermissions.some(
                      (permission) => permission.title === p.title
                    )
                ).length
              )
            }
          >
            <Badge variant={"destructive"} className="flex gap-1">
              {" "}
              <AlertTriangleIcon size={16} /> Alle rettigheter er lagt til
            </Badge>
          </Conditional>
        </div>

        <Conditional render={Boolean(allRoles?.length)}>
          <Select
            onValueChange={(role) => {
              let roleObj = allRoles.find((r) => r.id === parseInt(role));
              if (!roleObj || !roleObj.permissions) return;
              setUserPermissions(roleObj.permissions);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Velg en rolle..." />
            </SelectTrigger>
            <SelectContent className="overflow-visible">
              {allRoles.map((role, index) => (
                <SelectItem key={index} value={role.id?.toString() ?? ""}>
                  <div className="flex gap-2.5">
                    <span className="capitalize">{role.title}</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <InfoIcon size={16} />
                      </TooltipTrigger>
                      <TooltipContent>{role.description}</TooltipContent>
                    </Tooltip>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Conditional>
        <DialogFooter>
          <Button
            variant={"destructive"}
            className="flex gap-2.5"
            onClick={resetChanges}
          >
            <HistoryIcon size={16} />
            Nullstill
          </Button>
          <Button className="flex gap-2.5" onClick={setPermissions}>
            <Conditional render={!submitting}>
              <SaveIcon size={16} />
              Lagre
            </Conditional>
            <Conditional render={submitting}>
              <Loader />
            </Conditional>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
