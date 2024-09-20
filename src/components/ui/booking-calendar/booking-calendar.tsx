"use client";

import { nb } from "date-fns/locale";
import { cn } from "@/lib/utils";
import React from "react";
import { Calendar } from "../calendar";
import DayView from "./day-view";
import { DetailedBookableItemDto } from "@/lib/api";
import { motion } from "framer-motion";

interface BookingCalendarProps extends React.ComponentProps<typeof motion.div> {
  item: DetailedBookableItemDto;
}
export default function BookingCalendar({
  className,
  item,
  ...props
}: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );

  return (
    <motion.div
      className={cn("flex md:flex-row gap-5 flex-col", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        bounce: 0.25,
        type: "spring",
      }}
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
    </motion.div>
  );
}
