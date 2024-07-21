import { currentUser } from "@clerk/nextjs/server";
import { Button, ButtonProps } from "../button";
import UserAvatar from "../header/user-avatar";
import { cn } from "@/lib/utils";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Card } from "../card";
import { LogInIcon, TriangleAlertIcon } from "lucide-react";
import Typography from "../typography";
import ProfileDrawer from "./profile-drawer";

export default async function Profile({ className, ...props }: ButtonProps) {
  const user = await currentUser();
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
            className={cn("px-0", className)}
            cy-data="avatar-button"
          >
            <UserAvatar
              className="shadow-lg h-20 w-20"
              src={user?.imageUrl ?? ""}
            />
          </Button>
        </ProfileDrawer>
      </SignedIn>
    </div>
  );
}
