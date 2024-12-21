"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { newsFilterAtom } from "./filters";
import { useAtom } from "jotai";

interface MobileFiltersProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function MobileFilters({
  className,
  ...props
}: MobileFiltersProps) {
  const [query, setQuery] = useAtom(newsFilterAtom);

  return (
    <div className={cn("flex gap-5 w-full", className)} {...props}>
      <Input
        placeholder="Søk..."
        defaultValue={""}
        className="lg:w-72 w-full "
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
