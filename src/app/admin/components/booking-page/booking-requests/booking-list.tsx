import Banner from "@/components/ui/banner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Conditional from "@/components/ui/conditional";
import Illustration from "@/components/ui/illustration";
import { SimpleBookingDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import BookingCard from "./booking-card";

interface BookingListProps {}
export default async function BookingList() {
  const pending = await IFetch<SimpleBookingDto[]>({
    url: "/api/booking",
    config: {
      queryParams: {
        PageNumber: 1,
        PageSize: 6,
        status: 0,
      },
      method: "GET",
      next: {
        tags: ["pending-bookings"],
      },
    },
  });

  const confirmed = await IFetch<SimpleBookingDto[]>({
    url: "/api/booking",
    config: {
      queryParams: {
        status: 1,
      },
      method: "GET",
      next: {
        tags: ["confirmed-bookings"],
      },
    },
  });

  return (
    <>
      <Conditional render={pending?.length > 0}>
        <Card className="shadow-none bg-info/30">
          <CardHeader>
            <CardTitle>Disse må du ta en titt på</CardTitle>
            <CardDescription>Ubehandlede forespørsler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2.5">
              {pending?.map((booking, index) => (
                <BookingCard key={index} booking={booking} processed={false} />
              ))}
            </div>
          </CardContent>
        </Card>
      </Conditional>

      <Conditional render={confirmed?.length > 0}>
        <Card className="shadow-none p-0">
          <CardHeader className="px-0">
            <CardTitle>Disse er du ferdig med</CardTitle>
            <CardDescription>Godkjente forespørsler</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2.5">
              {confirmed.map((booking, index) => (
                <BookingCard key={index} booking={booking} />
              ))}
            </div>
          </CardContent>
        </Card>
      </Conditional>

      <Conditional render={!Boolean(pending.length)}>
        <Banner>
          <Illustration src="empty-cart.svg" /> Det er ingen ubehandlede
          forespørsler
        </Banner>
      </Conditional>
    </>
  );
}
