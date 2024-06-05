"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import Typography from "./typography";
import { Avatar, AvatarImage } from "./avatar";
import { useEffect, useState } from "react";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}
const Header = ({ className, ...props }: HeaderProps) => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const scrollHandler = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div
      {...props}
      className={cn(
        "w-full h-fit px-20 py-5 z-50 transition-colors duration-500",
        scroll > 0 ? "bg-background/70 backdrop-blur-sm" : "",
        className
      )}
    >
      <header className="flex justify-center md:justify-start">
        <Typography
          variant="h1"
          className="w-fit md:text-base text-primary-foreground !text-3xl"
        >
          Revetalhagen
        </Typography>
        <div className="w-full h-full md:flex hidden items-center justify-end gap-2">
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
