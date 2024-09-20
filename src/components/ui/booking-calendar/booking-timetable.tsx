"use client";

import { cn } from "@/lib/utils";
import { Badge } from "../badge";
import { useMemo } from "react";
import { isBefore, isSameDay } from "date-fns";

interface BookingTimetableProps extends React.HTMLProps<HTMLDivElement> {
  selectedDate?: Date;
}
export default function BookingTimetable({
  selectedDate,
  className,
  ...props
}: BookingTimetableProps) {
  const disableBefore = useMemo(() => {
    if (selectedDate && isBefore(selectedDate, new Date())) {
      return new Date().setHours(23, 59, 59, 999);
    }
    if (selectedDate && isSameDay(selectedDate, new Date())) {
      return new Date();
    }

    return new Date().setHours(0, 0, 0, 0);
  }, [selectedDate]);
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
        className={cn(
          "border-b-2 border-input border-solid bg-destructive/10 w-full top-0 left-0 absolute rounded-t-lg",
          disableBefore ? "block" : "hidden"
        )}
        style={{
          height: `calc(100% - ${disableBefore})`,
        }}
      />
    </div>
  );
}
