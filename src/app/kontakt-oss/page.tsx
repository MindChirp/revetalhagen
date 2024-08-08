import PageWrapper from "@/components/layout/page-wrapper";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageCard from "@/components/ui/page-card";
import Typography from "@/components/ui/typography";

export default function ContactUs() {
  return (
    <PageWrapper>
      <PageCard>
        <CardHeader>
          <CardTitle>Kontakt oss</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="h1">Blablabla</Typography>
        </CardContent>
      </PageCard>
    </PageWrapper>
  );
}
