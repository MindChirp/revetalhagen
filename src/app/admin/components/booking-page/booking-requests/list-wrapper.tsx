import { IFetch } from "@/lib/IFetch";
import BookingList from "./booking-list";
import { DetailedBookingDto } from "@/lib/api";

export default async function ListWrapper() {
  const bookings = await IFetch<DetailedBookingDto[]>({
    url: "/api/Booking",
    config: {
      method: "GET",
      queryParams: {
        Status: 0,
        PageSize: 20,
      },
      next: {
        tags: ["bookings"],
      },
    },
  });
  return <BookingList bookings={bookings} />;
}
