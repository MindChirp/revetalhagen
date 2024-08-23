"use client";

import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";
import { Button, ButtonProps } from "../button";
import { Card } from "../card";
import UserAvatar from "../header/user-avatar";
import Typography from "../typography";
import ProfileDrawer from "./profile-drawer";

export default function Profile({ className, ...props }: ButtonProps) {
  const { user, isLoaded } = useUser();
  return (
    <div className="w-full flex items-center justify-center py-2">
      <SignedOut>
        <Card className="flex gap-2.5 items-center p-2 shadow-lg rounded-full">
          <div className="bg-accent p-2 rounded-full">
            <LogInIcon className="text-primary-foreground" />
          </div>
          <SignInButton mode="modal">
            <Typography variant="small" className="text-primary-foreground">
              Medlem? Trykk for å logge inn
            </Typography>
          </SignInButton>
        </Card>
      </SignedOut>
      <SignedIn>
        <ProfileDrawer user={user ?? undefined}>
          <Button
            variant={"ghost"}
            className={cn("-mb-2 px-0", className)}
            cy-data="avatar-button"
          >
            <UserAvatar
              className="shadow-lg h-16 w-16"
              src={user?.imageUrl ?? ""}
            />
          </Button>
        </ProfileDrawer>
      </SignedIn>
    </div>
  );
}
