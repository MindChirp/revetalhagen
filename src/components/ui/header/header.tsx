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
import { useUser } from "@clerk/nextjs";
import Offerings from "../offerings";
import Image from "next/image";

const Items: MenuItemsProps["items"] = [
  {
    label: "Tilbud",
    variant: "ghost",
    content: <Offerings />,
  },
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
        "w-full h-fit px-24 md:bg-transparent z-50 transition-colors duration-500",
        className
      )}
    >
      <header
        className={cn(
          "flex justify-center md:justify-start rounded-full transition-all px-10 py-3 items-center",
          scroll > 100 ? "md:bg-background/70 backdrop-blur-sm" : ""
        )}
      >
        <Link href={routes.LANDING} className="w-fit">
          <Button variant="ghost" className="gap-2.5 bg-transparent">
            <Image
              src="/nakuhel-logo.webp"
              width={50}
              height={50}
              alt="Nakuhel logo"
            />
            <Typography
              variant="h1"
              className="w-fit md:text-base text-primary-foreground !text-3xl"
            >
              Revetalhagen
            </Typography>
          </Button>
        </Link>
        <div className="w-full h-full md:flex hidden items-center justify-end gap-2">
          {/* {data.user && <Button variant={"ghost"}>Medlemsområde</Button>} */}
          {/* <Button variant={"ghost"}>Utleie</Button> */}
          {/* <Button variant={"ghost"}>Medlemsområde</Button>
          <Button variant={"ghost"}>Arrangementer</Button>
          <Button variant={"ghost"}>Utleie</Button> */}
          <Link href="/nyheter">
            <Button variant={"ghost"}>Nyheter</Button>
          </Link>
          <MenuItems items={Items} />
          <Link href={routes.CONTACT_US}>
            <Button variant={"ghost"} className="ml-16">
              Kontakt oss
            </Button>
          </Link>
          <ProfilePopover
            name={data.user?.firstName ?? ""}
            image={data.user?.imageUrl}
            className="min-w-72 w-fit max-w-screen-sm"
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
