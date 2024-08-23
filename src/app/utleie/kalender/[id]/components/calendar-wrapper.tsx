"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function CalendarWrapper() {
  const [data, setData] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <div className="w-fit mx-auto">
      <Calendar
        mode="range"
        selected={data}
        onSelect={(range) => setData(range)}
      />
    </div>
  );
}
