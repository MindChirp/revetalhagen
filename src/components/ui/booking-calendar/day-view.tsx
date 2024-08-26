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

interface DayViewProps extends React.HTMLProps<HTMLDivElement> {
  selectedDate?: Date;
}
export default function DayView({
  className,
  selectedDate,
  ...props
}: DayViewProps) {
  return (
    <div className={cn("", className)} {...props}>
      <Conditional render={!!selectedDate}>
        <motion.div
          className={
            "flex gap-5 flex-col rounded-3xl border border-border border-solid py-6 min-h-full"
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
          <Badge className="w-fit mx-auto" variant={"default"}>
            <Typography className="text-center capitalize">
              {selectedDate
                ? format(selectedDate ?? "", "EEEE d. MMMM", {
                    locale: nb,
                  })
                : undefined}
            </Typography>
          </Badge>
          <BookingTimetable selectedDate={selectedDate} />
        </motion.div>
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