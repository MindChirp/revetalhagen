"use client";

import {
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";
import Typography from "../typography";
import Link from "next/link";
import { routes } from "@/lib/routes";
import MobileSidebar from "./mobile-sidebar";

interface MobileNavbarProps extends React.HTMLAttributes<HTMLElement> {}
export default function MobileNavbar({
  className,
  ...props
}: MobileNavbarProps) {
  const [scope, animate] = useAnimate();
  const [textScope, animateText] = useAnimate();

  const scroll = useScroll();
  const [minimized, setMinimized] = useState(false);

  useMotionValueEvent(scroll.scrollY, "change", (latest) => {
    // const direction = Math.min(
    //   Math.max(latest - (scroll.scrollY.getPrevious() ?? 0), -1),
    //   1
    // );

    if (scroll.scrollY.get() > 0) {
      setMinimized(true);
    } else {
      setMinimized(false);
    }
  });

  useEffect(() => {
    console.log;
    if (minimized) {
      animate(
        scope.current,
        {
          width: "auto",
        },
        {
          type: "spring",
          damping: 10,
        }
      );
      animateText(textScope.current, {
        opacity: 0,
        width: 0,
        marginLeft: 0,
      });
    } else if (!minimized) {
      animate(
        scope.current,
        {
          width: 200,
          display: "inline-block",
        },
        {
          type: "spring",
          damping: 10,
        }
      );
      animateText(textScope.current, {
        opacity: 1,
        width: "fit-content",
        marginLeft: 10,
      });
    }
  }, [minimized, animate, scope, animateText, textScope]);

  return (
    <div
      className={cn(
        "bg-gradient-to-t from-background to-transparent fixed -bottom-[1px] pb-5 w-full z-50",
        className
      )}
      {...props}
    >
      <div className="w-fit mx-auto">
        <div ref={scope}>
          <MobileSidebar>
            <Button className="w-full" size={"lg"}>
              <MenuIcon
                size={minimized ? 20 : 16}
                className={cn(
                  "transition-all",
                  minimized ? "animate-spin repeat-1 duration-200" : ""
                )}
              />
              <span ref={textScope} className="overflow-hidden">
                Åpne sidemeny
              </span>
            </Button>
          </MobileSidebar>
        </div>
      </div>
    </div>
  );
}
