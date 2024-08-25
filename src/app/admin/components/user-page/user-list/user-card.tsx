import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserAvatar from "@/components/ui/header/user-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Typography from "@/components/ui/typography";
import { SimpleUserDto } from "@/lib/api";
import { HammerIcon, LockKeyholeIcon, PencilIcon } from "lucide-react";

interface UserCardProps {
  user: SimpleUserDto;
}
export default function UserCard({ user }: UserCardProps) {
  return (
    <Card className="p-6 w-full border-border border border-solid shadow-none">
      <div className="flex flex-col w-full justify-center items-center gap-2.5">
        <div className="rounded-full shadow-md">
          <UserAvatar src={user.avatarUri ?? ""} className="w-20 h-20" />
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="p" className="!mt-0">
            {user.fullName}{" "}
          </Typography>
          <Badge>
            <Typography variant="small">@{user.username}</Typography>
          </Badge>
        </div>
        <div className="flex gap-2.5 w-full pt-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"destructive"} className="w-fit flex gap-2.5">
                <HammerIcon size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bannlys</TooltipContent>
          </Tooltip>
          <Button className="w-full flex gap-2.5">
            <LockKeyholeIcon size={16} />
            Rettigheter
          </Button>
        </div>
      </div>
    </Card>
  );
}
