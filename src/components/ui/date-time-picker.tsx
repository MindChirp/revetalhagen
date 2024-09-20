"use client";

import * as React from "react";
import { add, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerDemo } from "./time-picker-demo";
import { Input, InputProps } from "./input";
import { nb } from "date-fns/locale";

interface DateTimePickerProps extends Omit<InputProps, "value" | "onChange"> {
  value?: Date;
  onChange?: (date: Date) => void;
  buttonProps?: ButtonProps;
}
export function DateTimePicker({
  value,
  onChange,
  buttonProps,
  ...props
}: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date>();

  React.useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  const updateDate = (value?: Date) => {
    setDate(value);
    if (value && onChange) {
      onChange(value);
    }
  };

  /**
   * carry over the current time when a user clicks a new day
   * instead of resetting to 00:00
   */
  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!date) {
      updateDate(newDay);
      return;
    }
    const diff = newDay.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    updateDate(newDateFull);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          {...buttonProps}
          className={cn(
            "min-w-[150px] w-full justify-start text-left font-normal border-2",
            !date && "text-muted-foreground",
            buttonProps?.className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "d.L.y HH:mm", {
              locale: nb,
            })
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Input type="hidden" value={date?.toString()} {...props} />
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleSelect(d)}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePickerDemo setDate={updateDate} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
