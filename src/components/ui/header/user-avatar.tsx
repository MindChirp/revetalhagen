import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

interface UserAvatarProps extends React.HTMLProps<HTMLSpanElement> {
  src?: string;
}
const UserAvatar = ({ src, ...props }: UserAvatarProps) => {
  return (
    <Avatar {...props}>
      <AvatarImage src={src} />
      <AvatarFallback>
        <UserIcon />
      </AvatarFallback>
    </Avatar>
  );
};
export default UserAvatar;
