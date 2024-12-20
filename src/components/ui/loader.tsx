"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoaderProps extends React.ComponentProps<typeof Loader2> {
  color?: string;
}
export default function Loader({ className, ...props }: LoaderProps) {
  // useEffect(() => {
  //   const load = async () => {
  //     const ldrs = await import("ldrs");
  //     // ldrs.newtonsCradle.register();
  //   };
  //   load();
  // }, []);
  return (
    <Loader2 className={cn("animate-spin", className)} size={16} {...props} />
  );
}
