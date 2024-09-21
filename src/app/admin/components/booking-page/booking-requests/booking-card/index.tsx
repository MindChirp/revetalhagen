import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Conditional from "@/components/ui/conditional";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserAvatar from "@/components/ui/header/user-avatar";
import Typography from "@/components/ui/typography";
import { SimpleBookableItemDto, SimpleBookingDto } from "@/lib/api";
import { format } from "date-fns";

interface BookingCardProps {
  booking: SimpleBookingDto;
  processed?: boolean;
}
export default function BookingCard({
  booking,
  processed = true,
}: BookingCardProps) {
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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Behandle</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Behandle forespørselen til {booking.bookedBy?.fullName}
                </DialogTitle>
                <DialogDescription>
                  Velg om du vil endre, avslå eller godkjenne forespørselen
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Conditional>
    </Card>
  );
}
