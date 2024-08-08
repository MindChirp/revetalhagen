import { routes } from "@/lib/routes";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../button";
import Conditional from "../conditional";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import Typography from "../typography";
import UserAvatar from "./user-avatar";

interface ProfilePopoverProps extends React.HTMLProps<HTMLDivElement> {
  name?: string;
  image?: string;
}
const ProfilePopover = ({ name, image, ...props }: ProfilePopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="px-0" cy-data="avatar-button">
          <UserAvatar src={image} />
        </Button>
      </PopoverTrigger>
      <PopoverContent {...props} cy-data="popover-content">
        <SignedIn>
          <SignedInContent userName={name ?? ""} image={image ?? ""} />
        </SignedIn>
        <SignedOut>
          <SignedOutContent />
        </SignedOut>
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
          className="capitalize text-center overflow-hidden w-full border-none"
        >
          Hei, {userName.substring(0, 12)}!
        </Typography>
      </div>

      <div className="flex w-full flex-col gap-2">
        <Conditional render={true}>
          <Link href={routes.ADMIN}>
            <Button variant="default" className="w-full">
              Admin
            </Button>
          </Link>
        </Conditional>
        {/* <Button variant="default" className="w-full">
          Min side
        </Button> */}

        <SignOutButton>
          <Button variant="destructive" className="w-full">
            Logg ut
          </Button>
        </SignOutButton>
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
      <SignInButton mode="modal">
        <Button variant="default" className="w-full">
          Logg inn
        </Button>
      </SignInButton>
    </div>
  );
};

export default ProfilePopover;
