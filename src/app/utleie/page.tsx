import PageWrapper from "@/components/layout/page-wrapper";
import { CardTitle } from "@/components/ui/card";
import PageCard from "@/components/ui/page-card";

export default function Bookings() {
  return (
    <PageWrapper>
      <PageCard header={<CardTitle>Utleie</CardTitle>}></PageCard>
    </PageWrapper>
  );
}
