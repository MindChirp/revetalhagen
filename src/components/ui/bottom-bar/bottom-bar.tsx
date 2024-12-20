"use client";
import { cn } from "@/lib/utils";
import Typography from "../typography";
import { Button } from "../button";
import Link from "next/link";
import React from "react";
import { routes } from "@/lib/routes";
import { BedIcon, CalendarIcon, NewspaperIcon } from "lucide-react";
import ProfilePopover from "../header/profile-popover";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

interface BottomBarProps extends React.HTMLAttributes<HTMLDivElement> {
  // TODO
}

export default function BottomBar({ className, ...props }: BottomBarProps) {
  const data = useUser();
  return (
    <div
      className={cn("bg-background/80 backdrop-blur-sm p-5", className)}
      {...props}
    >
      <div className="flex justify-between items-center w-fit mx-auto h-fit gap-10">
        <Barbutton
          route={routes.NEWS}
          icon={<NewspaperIcon size={20} />}
          label="Nyheter"
        />
        <Barbutton
          route={routes.BOOKING}
          icon={<BedIcon size={20} />}
          label="Utleie"
        />
        <Barbutton
          route={routes.CONTACT_US}
          icon={<CalendarIcon size={20} />}
          label="Kalender"
        />
        <ProfilePopover
          name={data.user?.firstName ?? ""}
          image={data.user?.imageUrl}
        />
      </div>
    </div>
  );
}

const Barbutton = ({
  route,
  icon,
  label,
}: {
  route: string;
  icon: React.ReactNode;
  label: string;
}) => {
  const path = usePathname();

  return (
    <Link
      className="flex flex-col justify-center items-center gap-0.5"
      href={route}
    >
      <div
        className={cn(
          "px-4 py-1",
          path === route ? "bg-accent rounded-full" : ""
        )}
      >
        {icon}
      </div>
      <Typography variant="small">{label}</Typography>
    </Link>
  );
};
