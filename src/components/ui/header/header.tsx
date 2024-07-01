"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import ProfilePopover from "./profile-popover";
import { Button } from "../button";
import Typography from "../typography";
import MenuItems, { MenuItemsProps } from "./menu-items";
import Support from "./support";
import About from "./about";
import { useUser } from "@auth0/nextjs-auth0/client";
import { NewsService } from "@/lib/api";
import { postNews } from "./thing";

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
  const data = useUser();

  const doShit = () => {
    postNews("Dette er en test", "Mor di")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (data.isLoading) return;
    console.log(data);
  }, [data, data.isLoading]);
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
          {data.user && <Button variant={"ghost"}>Medlemsområde</Button>}
          <Button variant={"ghost"}>Utleie</Button>
          {/* <Button variant={"ghost"}>Medlemsområde</Button>
          <Button variant={"ghost"}>Arrangementer</Button>
          <Button variant={"ghost"}>Utleie</Button> */}
          <Link href="/nyheter">
            <Button variant={"ghost"}>Nyheter</Button>
          </Link>
          <MenuItems items={Items} />
          <Button onClick={doShit} variant={"ghost"} className="ml-16">
            Kontakt oss
          </Button>
          <ProfilePopover
            name={"Ola"}
            className="min-w-72 w-fit max-w-screen-sm"
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
