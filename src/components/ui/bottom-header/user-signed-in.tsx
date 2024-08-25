"use client";

import { SignedIn } from "@clerk/nextjs";
import ProfileDrawer from "./profile-drawer";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import UserAvatar from "../header/user-avatar";
import { User } from "@clerk/nextjs/server";

interface UserSignedInProps {
  user: User;
  className?: string;
}
export default function UserSignedIn({ user, className }: UserSignedInProps) {
  return (
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
  );
}
