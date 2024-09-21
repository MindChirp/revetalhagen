"use client";

import { SimpleBookingDto } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { Button, ButtonProps } from "../../button";
import Typography from "../../typography";
import { format } from "date-fns";

interface BookingCardProps extends ButtonProps {
  booking: SimpleBookingDto & { ghost?: boolean };
  startBuffer: Date;
  endBuffer: Date;
}
export default function BookingCard({
  booking,
  startBuffer,
  endBuffer,
  className,
  ...props
}: BookingCardProps) {
  const startBufferDuration = useMemo(() => {
    return (
      startBuffer.getTime() -
      new Date(new Date(startBuffer.getTime()).setHours(0, 0, 0, 0)).getTime()
    );
  }, [startBuffer]);

  const endBufferDuration = useMemo(() => {
    return (
      new Date(
        new Date(endBuffer.getTime()).setHours(23, 59, 59, 999)
      ).getTime() - endBuffer.getTime()
    );
  }, [endBuffer]);

  const msInDay = useMemo(() => {
    return 24 * 60 * 60 * 1000 - (startBufferDuration + endBufferDuration);
  }, [startBufferDuration, endBufferDuration]);

  const startHeight = useMemo(() => {
    const diff = Math.max(
      new Date(booking.fromDate ?? "").getTime() - startBuffer.getTime(),
      0
    );
    return ((diff / msInDay) * 100).toFixed(2);
  }, [startBuffer, booking, msInDay]);

  return (
    <Button
      className={cn(
        "shadow-md w-[calc(100%_-_8rem)] rounded-lg absolute",
        booking.ghost
          ? "bg-primary-foreground/20 z-10 left-3"
          : "bg-primary border-border border z-0 right-6",
        className
      )}
      style={{
        top: `${startHeight}%`,
        height: `${
          ((new Date(booking.toDate ?? "").getTime() -
            new Date(booking.fromDate ?? "").getTime()) /
            msInDay) *
          100
        }%`,
      }}
      {...props}
    >
      <div>
        <Typography variant="small">
          {format(booking.fromDate!, "HH:mm")} -{" "}
          {format(booking.toDate!, "HH:mm")}
        </Typography>
      </div>
    </Button>
  );
}
