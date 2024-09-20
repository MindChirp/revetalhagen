"use client";

import { cn } from "@/lib/utils";
import Typography from "../typography";
import { format } from "date-fns";
import Conditional from "../conditional";
import Banner from "../banner";
import Illustration from "../illustration";
import { nb } from "date-fns/locale";
import { Badge } from "../badge";
import BookingTimetable from "./booking-timetable";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { DetailedBookableItemDto } from "@/lib/api";

interface DayViewProps extends React.HTMLProps<HTMLDivElement> {
  selectedDate?: Date;
  item: DetailedBookableItemDto;
}
export default function DayView({
  className,
  item,
  selectedDate,
  ...props
}: DayViewProps) {
  return (
    <div className={cn("", className)} {...props}>
      <Conditional render={!!selectedDate}>
        <div className="flex gap-2.5 flex-col">
          <Badge className="w-fit" variant={"default"}>
            <Typography className="text-center capitalize">
              {selectedDate
                ? format(selectedDate ?? "", "EEEE d. MMMM", {
                    locale: nb,
                  })
                : undefined}
            </Typography>
          </Badge>
          <motion.div
            className={
              "flex gap-5 flex-col rounded-3xl border border-border border-solid pb-6 min-h-full"
            }
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
              bounce: 0.25,
              type: "spring",
            }}
          >
            <BookingTimetable selectedDate={selectedDate} item={item} />
          </motion.div>
        </div>
      </Conditional>
      <Conditional render={!selectedDate}>
        <Banner className="h-full items-center justify-center">
          <Illustration src="pick-date.svg" /> Velg en dato i kalenderen for å
          se ledige tidsrom
        </Banner>
      </Conditional>
    </div>
  );
}
