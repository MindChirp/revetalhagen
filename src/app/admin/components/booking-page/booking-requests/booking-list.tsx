import Conditional from "@/components/ui/conditional";
import Illustration from "@/components/ui/illustration";
import { DetailedBookingDto } from "@/lib/api";

interface BookingListProps {
  bookings: DetailedBookingDto[];
  // onAccept: (booking: DetailedBookableItemBookingDto) => void;
  // onReject: (booking: DetailedBookableItemBookingDto) => void;
}
export default function BookingList({ bookings }: BookingListProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        {bookings.map((booking, index) => (
          <div key={index}>{booking.bookedBy?.fullName}</div>
        ))}
      </div>
      <Conditional render={!Boolean(bookings.length)}>
        <Illustration src="empty-cart.svg" /> Det finnes ingen
        bookingforespørsler
      </Conditional>
    </>
  );
}
