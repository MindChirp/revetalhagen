"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { atom, useAtom } from "jotai";
import { PlusIcon } from "lucide-react";

export type SubPages = "about" | "support" | "add";
const subPageAtom = atom<SubPages>("about");

export default function SubPages() {
  const [page, setPage] = useAtom(subPageAtom);

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        duration: 0.5,
        bounce: 0.25,
      }}
      className="grid grid-cols-[1fr_3fr] w-full h-full"
    >
      <div className="flex gap-2.5 w-full h-full">
        <div className="flex flex-col w-full">
          <Button
            variant={page === "about" ? "default" : "ghost"}
            onClick={() => setPage("about")}
          >
            Om oss
          </Button>
          <Button
            variant={page === "support" ? "default" : "ghost"}
            onClick={() => setPage("support")}
          >
            Støtt oss
          </Button>
          <Tooltip>
            <TooltipTrigger>
              <Button className="gap-2.5 items-center" variant="ghost" disabled>
                <PlusIcon size={16} />
                Legg til
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Denne funksjonen er deaktivert inntil videre
            </TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" />
      </div>
    </motion.div>
  );
}
