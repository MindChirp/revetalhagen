"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";

const Items: MenuItemsProps["items"] = [
  // {
  //   label: "Tilbud",
  //   variant: "ghost",
  //   content: <Offerings />,
  // },
  {
    label: "Om oss",
    variant: "ghost",
    content: <About />,
  },
  // {
  //   label: "Støtt oss",
  //   variant: "primary",
  //   content: <Support />,
  // },
];

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}
const Header = ({ className, ...props }: HeaderProps) => {
  const [scroll, setScroll] = useState(0);
  const data = useUser();
  const pathName = usePathname();
  /**
   * The inset header is only used on the landing page to make it align neatly with the
   * hero section.
   */
  const insetHeader = useMemo(() => {
    return pathName === routes.LANDING;
  }, [pathName]);

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
        "w-full h-fit md:bg-transparent z-50 transition-colors md:px-24 px-10 duration-500 justify-center flex",
        insetHeader ? "absolute mt-16" : "sticky",
        className
      )}
    >
      <header
        className={cn(
          "flex justify-center md:max-lg:justify-between md:justify-start rounded-full w-full transition-all px-3.5 py-3 items-center",
          scroll > 30 ? "bg-background/80 backdrop-blur-sm" : ""
        )}
      >
        <Link
          href={routes.LANDING}
          className="flex gap-2.5 hover:bg-accent rounded-full w-min items-center px-1"
        >
          <div className="w-10">
            <Image
              src="/nakuhel-logo.webp"
              width={40}
              height={40}
              className="w-full md:hidden lg:block"
              alt="Nakuhel logo"
            />
          </div>
          <Typography
            variant="h1"
            className="w-fit md:text-base text-primary-foreground !text-3xl xl:block md:max-xl:hidden"
          >
            Revetalhagen
          </Typography>
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
