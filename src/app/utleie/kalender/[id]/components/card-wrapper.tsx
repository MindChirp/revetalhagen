import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import PageCard from "@/components/ui/page-card";
import { DetailedBookableItemDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import CalendarWrapper from "./calendar-wrapper";

interface CardWrapperProps {
  id: string;
}

export default async function CardWrapper({ id }: CardWrapperProps) {
  const item = await IFetch<DetailedBookableItemDto>({
    url: `/api/BookableItem/${id}`,
    config: {
      method: "GET",
      next: {
        tags: ["bookableitem", id],
      },
    },
  }).then((res) => {
    if ("name" in res) return res;

    throw res;
  });
  return (
    <PageCard
      header={
        <>
          <CardTitle>{item.name}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </>
      }
    >
      <CardContent>
        <CalendarWrapper item={item} />
      </CardContent>
    </PageCard>
  );
}
