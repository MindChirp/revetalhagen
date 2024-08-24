"use client";

import { cn } from "@/lib/utils";
import { Badge } from "../badge";

interface BookingTimetableProps extends React.HTMLProps<HTMLDivElement> {
  selectedDate?: Date;
}
export default function BookingTimetable({
  selectedDate,
  className,
  ...props
}: BookingTimetableProps) {
  const nowTime = new Date();
  return (
    <div className="w-full h-fit relative">
      <div className={cn("w-full h-fit relative px-6", className)} {...props}>
        {new Array(18).fill(0).map((_, i) => (
          <div key={i} className="w-full h-12 flex items-end justify-start">
            <Badge variant={"secondary"}>{i + 5}:00</Badge>
          </div>
        ))}
      </div>
      <div
        className="border-b-2 border-input border-solid bg-destructive/10 w-full top-0 left-0 absolute rounded-t-lg"
        style={{
          height: "calc(100% - 10%)",
        }}
      />
    </div>
  );
}
