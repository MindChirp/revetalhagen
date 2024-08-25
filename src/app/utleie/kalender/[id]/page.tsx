import PageWrapper from "@/components/layout/page-wrapper";
import { CardHeader, CardTitle } from "@/components/ui/card";
import PageCard from "@/components/ui/page-card";
import Typography from "@/components/ui/typography";
import { PathParams } from "@/lib/utils";
import CardWrapper from "./components/card-wrapper";
import { Suspense } from "react";
import CalendarPageSkeleton from "./components/calendar-page-skeleton";
export default function Page({ params }: PathParams<{ id: string }>) {
  const { id } = params;
  return (
    <PageWrapper>
      <Suspense fallback={<CalendarPageSkeleton />}>
        <CardWrapper id={id} />
      </Suspense>
    </PageWrapper>
  );
}
