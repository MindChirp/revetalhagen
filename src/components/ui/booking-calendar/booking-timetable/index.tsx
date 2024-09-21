"use client";

import { DetailedBookableItemDto, SimpleBookingDto } from "@/lib/api";
import { cn, getDayProgressPercentage } from "@/lib/utils";
import { isBefore, isSameDay } from "date-fns";
import { useMemo } from "react";
import Conditional from "../../conditional";
import HourStrip from "../hour-strip";
import BookingCard from "./booking-card";

interface BookingTimetableProps extends React.HTMLProps<HTMLDivElement> {
  selectedDate?: Date;
  item: DetailedBookableItemDto;
  existingBookings: SimpleBookingDto[];
}

export default function BookingTimetable({
  selectedDate,
  existingBookings,
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

  const START_BUFFER = new Date(
    new Date(selectedDate?.toString() ?? "").setHours(5, 0, 0, 0)
  );
  const END_BUFFER = new Date(
    new Date(selectedDate?.toString() ?? "").setHours(22, 0, 0, 0)
  );

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
            date={new Date(selectedDate ?? "")}
            disabled={
              new Date(new Date().setHours(i + 5, 0, 0, 0)).getTime() <
              disableBefore.getTime()
            }
          />
        ))}
        <div className="w-full h-[calc(100%_-_4.5rem)] top-[3rem] absolute pointer-events-none">
          {existingBookings.map((booking, index) => (
            <BookingCard
              booking={booking}
              key={index}
              startBuffer={START_BUFFER}
              endBuffer={END_BUFFER}
            />
          ))}
        </div>
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
              START_BUFFER,
              END_BUFFER
            )}%`,
          }}
        />
      </Conditional>
    </div>
  );
}
