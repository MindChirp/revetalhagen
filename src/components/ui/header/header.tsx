"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { UserIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ProfilePopover from "./profile-popover";
import { Button } from "../button";
import Typography from "../typography";
import MenuItems, { MenuItemsProps } from "./menu-items";
import Support from "./support";
import About from "./about";

const Items: MenuItemsProps["items"] = [
  {
    label: "Om oss",
    variant: "ghost",
    content: <About />,
  },
  {
    label: "Støtt oss",
    variant: "primary",
    content: <Support />,
  },
];

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
          <Button variant="ghost">
            <Typography
              variant="h1"
              className="w-fit md:text-base text-primary-foreground !text-3xl"
            >
              Revetalhagen
            </Typography>
          </Button>
        </Link>
        <div className="w-full h-full md:flex hidden items-center justify-end gap-2">
          {/* <Button variant={"ghost"}>Medlemsområde</Button>
          <Button variant={"ghost"}>Arrangementer</Button>
          <Button variant={"ghost"}>Utleie</Button> */}
          <Link href="/nyheter">
            <Button variant={"ghost"}>Nyheter</Button>
          </Link>
          <MenuItems items={Items} />
          <Button variant={"ghost"} className="ml-16">
            Kontakt oss
          </Button>
          <ProfilePopover name={"Ola"} />
        </div>
      </header>
    </div>
  );
};

export default Header;
