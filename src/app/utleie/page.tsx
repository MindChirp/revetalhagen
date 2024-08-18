import PageWrapper from "@/components/layout/page-wrapper";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import PageCard from "@/components/ui/page-card";
import { DetailedBookableItemDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
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
          <div className="flex flex-col gap-5">
            {items.map((item, index) => (
              <BookableItemCard key={index} item={item} />
            ))}
          </div>
        </CardContent>
      </PageCard>
    </PageWrapper>
  );
}
