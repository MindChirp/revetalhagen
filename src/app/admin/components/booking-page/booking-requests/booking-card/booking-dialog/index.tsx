"use client";

import Banner from "@/components/ui/banner";
import BookingTimetable from "@/components/ui/booking-calendar/booking-timetable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Conditional from "@/components/ui/conditional";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Illustration from "@/components/ui/illustration";
import { ScrollArea } from "@/components/ui/scroll-area";
import Typography from "@/components/ui/typography";
import { useToast } from "@/components/ui/use-toast";
import {
  BookingStatus,
  ChangeBookingStateDto,
  SimpleBookableItemDto,
  SimpleBookingDto,
} from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import { format } from "date-fns";
import { InfoIcon } from "lucide-react";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import BookingCard from "..";

interface BookingDialogProps {
  booking: SimpleBookingDto;
}
export default function BookingDialog({ booking }: BookingDialogProps) {
  const { toast } = useToast();
  const { data: overlappingReservations, error } = useSWR(
    `/api/booking/${booking.id}/overlapping`,
    () =>
      IFetch<SimpleBookingDto[]>({
        url: "/api/booking",
        config: {
          queryParams: {
            fromDate: booking.fromDate,
            toDate: booking.toDate,
            bookableItemId: booking.bookableItem?.id,
            status: 1,
            PageSize: 4,
          },
          method: "GET",
        },
      }).then((res) => {
        // Only return the actual data, if error occurs, throw it
        if (Array.isArray(res)) {
          return res;
        } else throw res;
      })
  );

  const { trigger } = useSWRMutation(
    `/api/booking/${booking.id}`,
    (key: string, { arg }: { arg: ChangeBookingStateDto }) => {
      return IFetch({
        url: `/api/booking/state/${booking.id}`,
        config: {
          headers: {
            "Content-Type": "application/json",
          },
          revalidateTags: ["confirmed-bookings", "pending-bookings"],
          method: "POST",
          body: JSON.stringify(arg),
        },
      });
    }
  );

  const reject = () => {
    trigger({
      status: BookingStatus._2,
    })
      .then(() => {
        toast({
          title: "Forespørselen ble avslått",
        });
      })
      .catch(() => {
        toast({
          title: "Noe gikk galt",
          variant: "destructive",
        });
      });
  };

  const accept = () => {
    trigger({
      status: BookingStatus._1,
    })
      .then(() => {
        toast({
          title: "Forespørselen ble godkjent",
        });
      })
      .catch(() => {
        toast({
          title: "Noe gikk galt",
          variant: "destructive",
        });
      });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Behandle</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl w-fit">
        <DialogHeader>
          <DialogTitle>
            Behandle forespørselen til {booking.bookedBy?.fullName}
          </DialogTitle>
          <DialogDescription>
            Velg om du vil endre, avslå eller godkjenne forespørselen
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-2.5">
          <div className="flex flex-col gap-2.5">
            <div className="flex gap-2.5 items-center">
              <Typography className="font-bold">
                {format(booking.fromDate ?? "", "d.L.y HH:mm")}
              </Typography>
              <Typography>til</Typography>
              <Typography className="font-bold">
                {format(booking.toDate ?? "", "d.L.y HH:mm")}
              </Typography>
            </div>
            <Typography variant="small">
              @{booking.bookedBy?.username} skrev:
            </Typography>
            <div className="p-3 rounded-lg bg-accent">
              <ScrollArea>
                <Typography>{booking.applicationText}</Typography>
              </ScrollArea>
            </div>

            <Conditional render={(overlappingReservations?.length ?? 0) > 0}>
              <Card className="shadow-none bg-transparent">
                <CardHeader className="px-0">
                  <CardTitle>Kolliderende forespørsler</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-2.5">
                    {overlappingReservations?.map((reservation, index) => (
                      <BookingCard key={index} booking={reservation} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Conditional>
            <Conditional render={(overlappingReservations?.length ?? 0) == 0}>
              <Banner className="!bg-transparent">
                <Illustration src="./all-ok.svg" />
                <Typography>
                  Fant ingen reservasjoner som kræsjer med denne
                </Typography>
              </Banner>
            </Conditional>
          </div>
          <Conditional render={(overlappingReservations?.length ?? 0) > 0}>
            <div className="flex flex-col gap-2.5">
              <BookingTimetable
                className="w-full md:w-96"
                allowCreate={false}
                compact
                selectedDate={new Date(booking.fromDate ?? "")}
                existingBookings={[
                  ...(overlappingReservations ?? []),
                  { ...booking, ghost: true },
                ]}
                item={booking.bookableItem as SimpleBookableItemDto}
              />
              <Typography
                variant="small"
                className="w-fit flex gap-2.5 text-wrap"
              >
                <InfoIcon size={16} />
                Den gjennomsiktige reservasjonen er forespørselen du ser på nå
              </Typography>
            </div>
          </Conditional>
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={reject}>
            Avslå
          </Button>
          <Button onClick={accept}>Godkjenn</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
