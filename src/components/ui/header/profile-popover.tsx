import { getSession } from "@auth0/nextjs-auth0";
import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import Typography from "../typography";
import UserAvatar from "./user-avatar";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";

interface ProfilePopoverProps extends React.HTMLProps<HTMLDivElement> {
  name?: string;
}
const ProfilePopover = ({ ...props }: ProfilePopoverProps) => {
  const { user, isLoading, error } = useUser();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="px-0" cy-data="avatar-button">
          <UserAvatar src={user?.picture ?? ""} />
        </Button>
      </PopoverTrigger>
      <PopoverContent {...props} cy-data="popover-content">
        {user ? (
          <SignedInContent
            userName={user.nickname ?? ""}
            image={user.picture ?? ""}
          />
        ) : (
          <SignedOutContent />
        )}
      </PopoverContent>
    </Popover>
  );
};

const SignedInContent = ({
  userName,
  image,
}: {
  userName: string;
  image: string;
}) => {
  return (
    <div className="w-full flex items-center flex-col gap-2">
      <div className="flex flex-col items-center">
        <UserAvatar src={image} className="w-24 h-24" />
        <Typography
          variant="h2"
          className="text-center overflow-hidden w-full border-none"
        >
          Hei, {userName.substring(0, 12)}!
        </Typography>
      </div>

      <div className="flex w-full flex-col gap-2">
        <Button variant="default" className="w-full">
          Admin
        </Button>
        <Button variant="default" className="w-full">
          Min side
        </Button>
        <Link href={"/api/auth/logout"}>
          <Button variant="destructive" className="w-full">
            Logg ut
          </Button>
        </Link>
      </div>
    </div>
  );
};

const SignedOutContent = () => {
  return (
    <div className="w-full flex items-center flex-col gap-2">
      <Typography variant="h2" className="border-none">
        Hei, gjest!
      </Typography>
      <Link href={"/api/auth/login"} className="w-full">
        <Button variant="default" className="w-full">
          Logg inn
        </Button>
      </Link>
    </div>
  );
};

export default ProfilePopover;
