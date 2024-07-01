import PageWrapper from "@/components/layout/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import InterestForm from "./components/interest-form";

const VolunteerPage = () => {
  return (
    <PageWrapper>
      <Card className="w-fit min-w-[50%] mx-auto">
        <CardHeader>
          <Typography>Lyst til å bidra?</Typography>
          <CardDescription>
            Fyll inn detailjene dine under, så tar vi kontakt!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <InterestForm />
        </CardContent>
      </Card>
    </PageWrapper>
  );
};

export default VolunteerPage;
