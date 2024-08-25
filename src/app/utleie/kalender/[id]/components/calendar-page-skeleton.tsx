import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import PageCard from "@/components/ui/page-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CalendarPageSkeleton() {
  return (
    <PageCard
      header={
        <>
          <Skeleton className="w-1/4 h-6" />
          <Skeleton className="w-1/2 h-4" />
        </>
      }
    >
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-2.5">
          <Skeleton className="w-full h-96" />
          <Skeleton className="w-full h-96" />
        </div>
      </CardContent>
    </PageCard>
  );
}
