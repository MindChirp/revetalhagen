import { SignedOut, SignInButton } from "@clerk/nextjs";
import { currentUser, User } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";
import { ButtonProps } from "../button";
import { Card } from "../card";
import Conditional from "../conditional";
import Typography from "../typography";
import UserSignedIn from "./user-signed-in";

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
      <Conditional render={Boolean(user)}>
        <UserSignedIn user={user as User} />
      </Conditional>
    </div>
  );
}
