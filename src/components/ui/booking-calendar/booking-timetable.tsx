"use client";

import { cn, getDayProgressPercentage } from "@/lib/utils";
import { Badge } from "../badge";
import { useMemo } from "react";
import { isBefore, isSameDay } from "date-fns";
import Conditional from "../conditional";
import { Separator } from "../separator";
import HourStrip from "./hour-strip";
import { DetailedBookableItemDto } from "@/lib/api";

interface BookingTimetableProps extends React.HTMLProps<HTMLDivElement> {
  selectedDate?: Date;
  item: DetailedBookableItemDto;
}
export default function BookingTimetable({
  selectedDate,
  item,
  className,
  ...props
}: BookingTimetableProps) {
  const shouldShowLimit = useMemo(() => {
    const today = new Date();

    if (selectedDate && isSameDay(selectedDate, new Date())) {
      return true;
    }
    if (selectedDate && isBefore(selectedDate, today)) {
      return true;
    }
    return false;
  }, [selectedDate]);

  const disableBefore: Date = useMemo(() => {
    const date = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate && isBefore(selectedDate, today)) {
      date.setHours(23, 59, 59, 999);
      return date;
    }

    if (selectedDate && isSameDay(selectedDate, new Date())) {
      return date;
    }

    date.setHours(0, 0, 0, 0);
    return date;
  }, [selectedDate]);

  return (
    <div className="w-full h-fit relative">
      <div
        className={cn("w-full h-fit relative px-3 pt-6", className)}
        {...props}
      >
        {new Array(18).fill(0).map((_, i) => (
          <HourStrip
            item={item}
            key={i}
            hour={i + 5}
            disabled={
              new Date(new Date().setHours(i + 5, 0, 0, 0)).getTime() <
              disableBefore.getTime()
            }
          />
        ))}
      </div>
      <Conditional render={shouldShowLimit}>
        <div
          className={cn(
            "border-solid bg-destructive/10 w-full top-0 left-0 absolute rounded-t-3xl",
            disableBefore ? "block" : "hidden"
          )}
          style={{
            height: `${getDayProgressPercentage(
              disableBefore,
              new Date(new Date().setHours(5, 0, 0, 0)),
              new Date(new Date().setHours(22, 0, 0, 0))
            )}%`,
          }}
        />
      </Conditional>
    </div>
  );
}
