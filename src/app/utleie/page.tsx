import PageWrapper from "@/components/layout/page-wrapper";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import PageCard from "@/components/ui/page-card";
import { DetailedBookableItemDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import Banner from "@/components/ui/banner";
import Illustration from "@/components/ui/illustration";
import BookableItemCard from "./components/bookable-item-card";

export default async function Bookings() {
  const items = await IFetch<DetailedBookableItemDto[]>({
    url: `/api/BookableItem`,
    config: {
      method: "GET",
      next: {
        tags: ["bookableitems"],
      },
    },
  }).then((res) => {
    if (Array.isArray(res)) return res;

    throw res;
  });

  return (
    <PageWrapper>
      <PageCard
        className="animate-in fade-in duration-500"
        header={
          <>
            <CardTitle>Utleie</CardTitle>
            <CardDescription>
              Her kan du spørre om å få låne eiendelene våre
            </CardDescription>
          </>
        }
      >
        <CardContent>
          <div className="grid 3xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
            {items.map((item, index) => (
              <BookableItemCard key={index} item={item} />
            ))}
          </div>
          {!Boolean(items.length) && (
            <Banner>
              <Illustration src="empty-cart.svg" />
              Det finnes ingen gjenstander å leie
            </Banner>
          )}
        </CardContent>
      </PageCard>
    </PageWrapper>
  );
}
