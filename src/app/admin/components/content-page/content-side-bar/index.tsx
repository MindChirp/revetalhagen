"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { atom, useAtom } from "jotai";

export type ContentPages = "subpages" | "hero" | "other";
export const pageAtom = atom<ContentPages>("subpages");

interface ContentSideBarProps extends React.HTMLProps<HTMLDivElement> {}
export default function ContentSideBar({
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
        >
          Undersider
        </Button>
        <Button
          variant={page == "hero" ? "default" : "ghost"}
          onClick={() => setPage("hero")}
        >
          Velkomst
        </Button>
        <Button
          variant={page == "other" ? "default" : "ghost"}
          onClick={() => setPage("other")}
        >
          Andre ting
        </Button>
      </div>
      <Separator orientation="vertical" className="" />
    </div>
  );
}
