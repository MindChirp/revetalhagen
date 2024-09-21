"use client";

import { DetailedBookableItemDto, SimpleBookingDto } from "@/lib/api";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { motion } from "framer-motion";
import { Badge } from "../badge";
import Banner from "../banner";
import Conditional from "../conditional";
import Illustration from "../illustration";
import Typography from "../typography";
import BookingTimetable from "./booking-timetable";
import useSWR from "swr";
import { IFetch } from "@/lib/IFetch";

interface DayViewProps extends React.HTMLProps<HTMLDivElement> {
  selectedDate?: Date;
  item: DetailedBookableItemDto;
}

export const getItemBookingsTag = (
  itemId: number | string,
  selectedDate: Date
) => {
  return `bookings/${itemId}+${format(selectedDate, "d.L.y")}`;
};

export default function DayView({
  className,
  item,
  selectedDate,
  ...props
}: DayViewProps) {
  const { data: bookings, isLoading } = useSWR(
    getItemBookingsTag(item.id!, selectedDate ?? new Date()),
    () =>
      IFetch<SimpleBookingDto[]>({
        url: `/api/Booking`,
        config: {
          method: "GET",
          queryParams: {
            FromDate: new Date(
              new Date(selectedDate?.toString() ?? "").setHours(0, 0, 0, 0)
            ).toISOString(),
            ToDate: new Date(
              new Date(selectedDate?.toString() ?? "").setHours(23, 59, 59, 999)
            ).toISOString(),
            ItemId: item.id!,
            Status: 1,
            PageSize: 20,
            PageNumber: 1,
          },
          next: {
            tags: ["bookings"],
          },
        },
      }),
    {
      revalidateOnMount: true,
    }
  );

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
            <BookingTimetable
              selectedDate={selectedDate}
              item={item}
              existingBookings={bookings ?? []}
            />
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
