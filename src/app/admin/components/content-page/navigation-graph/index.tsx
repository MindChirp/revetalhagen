"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { atom, useAtom } from "jotai";
import { CircleHelpIcon, HandIcon, LayersIcon } from "lucide-react";

export type ContentPages = "subpages" | "hero" | "other";
export const pageAtom = atom<ContentPages>("subpages");

interface ContentSideBarProps extends React.HTMLProps<HTMLDivElement> {}
export default function NavigationGraph({
  className,
  ...props
}: ContentSideBarProps) {
  const [page, setPage] = useAtom(pageAtom);

  return (
    <div className="flex gap-2.5">
      <div className={cn("flex flex-col w-full", className)}>
        <Button
          variant={page == "subpages" ? "default" : "ghost"}
          onClick={() => setPage("subpages")}
          className="grid grid-cols-[0.5fr_2fr] text-left gap-2.5"
        >
          <LayersIcon size={16} />
          Undersider
        </Button>
        <Button
          variant={page == "hero" ? "default" : "ghost"}
          onClick={() => setPage("hero")}
          className="grid grid-cols-[0.5fr_2fr] text-left gap-2.5"
          disabled
        >
          <HandIcon size={16} />
          Velkomst
        </Button>
        <Button
          variant={page == "other" ? "default" : "ghost"}
          onClick={() => setPage("other")}
          className="grid grid-cols-[0.5fr_2fr] text-left gap-2.5"
          disabled
        >
          <CircleHelpIcon size={16} />
          Under utvikling
        </Button>
      </div>
      <Separator orientation="vertical" className="" />
    </div>
  );
}
