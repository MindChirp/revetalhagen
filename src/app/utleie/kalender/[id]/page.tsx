import PageWrapper from "@/components/layout/page-wrapper";
import { CardHeader, CardTitle } from "@/components/ui/card";
import PageCard from "@/components/ui/page-card";
import Typography from "@/components/ui/typography";
import { PathParams } from "@/lib/utils";
import CardWrapper from "./components/card-wrapper";
export default function Page({ params }: PathParams<{ id: string }>) {
  const { id } = params;
  return (
    <PageWrapper>
      <CardWrapper id={id} />
    </PageWrapper>
  );
}
