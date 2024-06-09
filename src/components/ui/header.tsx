"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import Typography from "./typography";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { UserIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
        <Link href={routes.LANDING}>
          <Button variant="ghost" className="bg-transparent">
            <Typography
              variant="h1"
              className="w-fit md:text-base text-primary-foreground !text-3xl"
            >
              Revetalhagen
            </Typography>
          </Button>
        </Link>
        <div className="w-full h-full md:flex hidden items-center justify-end gap-2">
          <Button variant={"ghost"}>Medlemsområde</Button>
          <Button variant={"ghost"}>Utleie</Button>
          <Button variant={"ghost"}>Nyheter</Button>
          <SupportButton></SupportButton>
          <Button variant={"ghost"} className="ml-16">
            Kontakt oss
          </Button>
          <ProfilePopover name={"Ola"} />
        </div>
      </header>
    </div>
  );
};

const SupportButton = () => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className="rounded-3xl">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="rounded-full bg-primary text-primary-foreground">
              Støtt oss
            </NavigationMenuTrigger>
            <NavigationMenuContent className="rounded-3xl">
              <div className="p-4 flex w-full flex-col gap-0">
                <SupportOption>Bli medlem</SupportOption>
                <SupportOption>Bli ambassadør</SupportOption>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

interface SupportOptionProps extends React.HTMLProps<HTMLDivElement> {}
const SupportOption = ({ children, ...props }: SupportOptionProps) => {
  return (
    <div {...props}>
      <Button className="w-full h-full" variant={"ghost"}>
        {children}
      </Button>
    </div>
  );
};

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

export default Header;
