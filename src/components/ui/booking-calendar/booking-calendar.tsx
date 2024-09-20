"use client";

import { nb } from "date-fns/locale";
import { cn } from "@/lib/utils";
import React from "react";
import { Calendar } from "../calendar";
import DayView from "./day-view";
import { DetailedBookableItemDto } from "@/lib/api";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "../card";
import { InfoIcon } from "lucide-react";
import Typography from "../typography";
import Conditional from "../conditional";

interface BookingCalendarProps extends React.ComponentProps<typeof motion.div> {
  item: DetailedBookableItemDto;
}
export default function BookingCalendar({
  className,
  item,
  ...props
}: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

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
        <Conditional render={Boolean(selectedDate)}>
          <motion.div
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              bounce: 0.25,
              duration: 0.5,
            }}
          >
            <Typography
              variant="muted"
              className="flex gap-2.5 leading-none items-start mx-auto w-full px-5"
            >
              <InfoIcon size={20} /> Trykk i timeplanen for å reservere
              tidsrommet.
            </Typography>
          </motion.div>
        </Conditional>
      </div>
      <DayView className="w-full" selectedDate={selectedDate} item={item} />
    </motion.div>
  );
}
