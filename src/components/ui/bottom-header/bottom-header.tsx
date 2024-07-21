import { cn } from "@/lib/utils";
import { Card } from "../card";
import { Button, ButtonProps } from "../button";
import {
  BookHeartIcon,
  InfoIcon,
  NewspaperIcon,
  PiggyBank,
  Shield,
  ShieldIcon,
} from "lucide-react";
import Typography from "../typography";
import Link from "next/link";
import Profile from "./profile";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Roles } from "@/types/globals";

const Buttons: (ActionButtonLooks & { role?: Roles })[] = [
  {
    icon: <NewspaperIcon />,
    label: "Nyheter",
    href: "/nyheter",
  },
  {
    icon: <BookHeartIcon />,
    label: "Om oss",
    href: "/om-oss",
  },
  {
    icon: <PiggyBank />,
    label: "Støtt oss",
    href: "/støtt-oss",
  },
  {
    icon: <ShieldIcon />,
    label: "Admin",
    href: "/admin",
    role: "admin",
  },
];
interface BottomHeaderProps extends React.HTMLProps<HTMLDivElement> {}
export default async function BottomHeader({
  className,
  ...props
}: BottomHeaderProps) {
  const user = await auth();
  if (user.sessionClaims?.metadata.role === "admin") {
  }
  return (
    <div className={cn("h-fit w-full px-5 fixed pb-3", className)} {...props}>
      <Profile />
      <Card className="border-accent border-2 border-solid items-center rounded-full p-2 flex justify-between gap-0 shadow-lg">
        {/*  Mobile bottom bar buttons    */}
        {Buttons.map((button, index) => {
          if (!button.role || button.role === user.sessionClaims?.metadata.role)
            return (
              <ActionButton
                className="w-full flex flex-col h-fit"
                key={index}
                {...button}
              />
            );

          return undefined;
        })}
      </Card>
    </div>
  );
}

type ActionButtonLooks = {
  icon: React.ReactNode;
  label: string;
  href: string;
};
interface ActionButtonProps extends ButtonProps, ActionButtonLooks {}

function ActionButton({ href, icon, label, ...props }: ActionButtonProps) {
  return (
    <Link href={href} className="w-full">
      <Button
        variant={"ghost"}
        className="w-full flex flex-col h-fit gap-1"
        {...props}
      >
        {icon}
        <Typography variant="small" className="font-semibold">
          {label}
        </Typography>
      </Button>
    </Link>
  );
}
