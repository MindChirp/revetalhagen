import { cn } from "@/lib/utils";
import { Button } from "./button";
import Typography from "./typography";
import { Avatar, AvatarImage } from "./avatar";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}
const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <div {...props} className={cn("w-full h-fit px-20 py-5 z-50", className)}>
      <header className="flex">
        <Typography
          variant="h1"
          className="w-fit md:text-base text-primary-foreground !text-3xl"
        >
          Revetalhagen
        </Typography>
        <div className="w-full h-full flex items-center justify-end gap-2">
          <Button variant={"ghost"}>Medlemsområde</Button>
          <Button variant={"ghost"}>Utleie</Button>
          <Button variant={"ghost"}>Nyheter</Button>
          <Button variant={"ghost"} className="ml-16">
            Kontakt oss
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
        </div>
      </header>
    </div>
  );
};

export default Header;
