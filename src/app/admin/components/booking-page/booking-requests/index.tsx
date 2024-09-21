import { Suspense } from "react";
import BookingList from "./booking-list";
import Typography from "@/components/ui/typography";
import Loader from "@/components/ui/loader";

export default function BookingRequests() {
  return (
    <Suspense fallback={<Loader className="mx-auto" />}>
      <BookingList />
    </Suspense>
  );
}
