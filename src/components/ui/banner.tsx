import React from "react";
import { Card } from "./card";
import { cn } from "@/lib/utils";

interface BannerProps extends React.ComponentProps<typeof Card> {}

export default function Banner({ children, className }: BannerProps) {
  return (
    <Card
      className={cn(
        "w-full bg-accent p-6 gap-2.5 shadow-none flex flex-col items-center justify-center",
        className
      )}
    >
      {children}
    </Card>
  );
}
