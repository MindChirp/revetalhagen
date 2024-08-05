import { cn } from "@/lib/utils";
import Loader from "./loader";
import { Loader2 } from "lucide-react";

export default function SuspenseUI({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-fit py-10",
        className
      )}
      {...props}
    >
      <Loader2 className="animate-spin" />
    </div>
  );
}
