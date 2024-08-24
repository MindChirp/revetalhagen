import { IFetch } from "@/lib/IFetch";
import BookingList from "./booking-list";
import { DetailedBookingDto } from "@/lib/api";

export default async function ListWrapper() {
  const bookings = await IFetch<DetailedBookingDto[]>({
    url: "/api/Booking",
    config: {
      method: "GET",
      next: {
        tags: ["bookings"],
      },
    },
  });
  return <BookingList bookings={bookings} />;
}
