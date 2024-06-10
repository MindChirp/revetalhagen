import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import Typography from "../typography";
import UserAvatar from "./user-avatar";

interface ProfilePopoverProps extends React.HTMLProps<HTMLDivElement> {
  name?: string;
}
const ProfilePopover = ({ name, ...props }: ProfilePopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="px-0" cy-data="avatar-button">
          <UserAvatar src="https://github.com/shadcn.png" />
        </Button>
      </PopoverTrigger>
      <PopoverContent {...props} cy-data="popover-content">
        <div className="w-full flex items-center flex-col gap-2">
          <div className="flex flex-col items-center">
            <UserAvatar
              src="https://github.com/shadcn.png"
              className="w-24 h-24"
            />
            <Typography variant="h2" className="border-none">
              Hei, {name}!
            </Typography>
          </div>

          <div className="flex w-full flex-col gap-2">
            <Button variant="default" className="w-full">
              Admin
            </Button>
            <Button variant="default" className="w-full">
              Min side
            </Button>
            <Button variant="destructive" className="w-full">
              Logg ut
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;
