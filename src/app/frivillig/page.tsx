import PageWrapper from "@/components/layout/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import InterestForm from "./components/interest-form";
import PageCard from "@/components/ui/page-card";

const VolunteerPage = () => {
  return (
    <PageWrapper backgroundImage='url("roar.jpg")'>
      <PageCard className="">
        <CardHeader>
          <Typography>Lyst til å bidra?</Typography>
          <CardDescription>
            Fyll inn detailjene dine under, så tar vi kontakt!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <InterestForm />
        </CardContent>
      </PageCard>
    </PageWrapper>
  );
};

export default VolunteerPage;
