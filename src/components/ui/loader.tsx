"use client";
import { cn } from "@/lib/utils";
import { newtonsCradle } from "ldrs";
import { Loader2 } from "lucide-react";

interface LoaderProps extends React.ComponentProps<typeof Loader2> {
  color?: string;
}
export default function Loader({ className, ...props }: LoaderProps) {
  newtonsCradle.register();
  return (
    <Loader2 className={cn("animate-spin", className)} size={16} {...props} />
  );
}
