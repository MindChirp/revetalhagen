"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Conditional from "@/components/ui/conditional";
import UserAvatar from "@/components/ui/header/user-avatar";
import Typography from "@/components/ui/typography";
import { SimpleBookingDto } from "@/lib/api";
import { format } from "date-fns";
import BookingDialog from "./booking-dialog";

interface BookingCardProps {
  booking: SimpleBookingDto;
  processed?: boolean;
}
export default function BookingCard({
  booking,
  processed = true,
}: BookingCardProps) {
  const accept = () => {};

  const reject = () => {};

  return (
    <Card className="bg-background shadow-sm border-input border flex flex-col">
      <CardHeader className="flex-1">
        <CardTitle>{booking.bookableItem?.name}</CardTitle>
        <CardDescription>
          {format(booking.fromDate ?? "", "d.L.y, HH:mm")} -{" "}
          {format(booking.toDate ?? "", "d.L.y, HH:mm")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2.5 items-center">
          <UserAvatar src={booking.bookedBy?.avatarUri ?? ""} />
          <Typography>{booking.bookedBy?.fullName}</Typography>
        </div>
      </CardContent>
      <Conditional render={!processed}>
        <CardFooter>
          <BookingDialog booking={booking} />
        </CardFooter>
      </Conditional>
    </Card>
  );
}
