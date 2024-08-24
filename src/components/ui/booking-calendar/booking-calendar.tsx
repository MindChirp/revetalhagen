"use client";

import { nb } from "date-fns/locale";
import { cn } from "@/lib/utils";
import React from "react";
import { Calendar } from "../calendar";
import DayView from "./day-view";
import { DetailedBookableItemDto } from "@/lib/api";

interface BookingCalendarProps extends React.HTMLProps<HTMLDivElement> {
  item: DetailedBookableItemDto;
}
export default function BookingCalendar({
  className,
  item,
  ...props
}: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

  return (
    <div
      className={cn("flex md:flex-row gap-5 flex-col", className)}
      {...props}
    >
      <div className="w-fit mx-auto h-fit md:sticky top-28">
        <Calendar
          locale={nb}
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
      </div>
      <DayView className="w-full" selectedDate={selectedDate} />
    </div>
  );
}
