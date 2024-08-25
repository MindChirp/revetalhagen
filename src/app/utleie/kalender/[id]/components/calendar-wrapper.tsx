"use client";

import BookingCalendar from "@/components/ui/booking-calendar/booking-calendar";
import { DetailedBookableItemDto } from "@/lib/api";

interface CalendarWrapperProps {
  item: DetailedBookableItemDto;
}
export default function CalendarWrapper({ item }: CalendarWrapperProps) {
  return <BookingCalendar item={item} className="w-full" />;
}
