import Banner from "@/components/ui/banner";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import ListWrapper from "./list-wrapper";

export default function BookingRequests() {
  return (
    <Banner>
      <Suspense fallback={<Skeleton className="w-full h-40" />}>
        <ListWrapper />
      </Suspense>
    </Banner>
  );
}
