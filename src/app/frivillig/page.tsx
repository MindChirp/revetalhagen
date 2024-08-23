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
      <PageCard
        className=""
        header={
          <>
            <Typography variant="h1">Lyst til å bidra?</Typography>
            <CardDescription>
              Fyll inn detailjene dine under, så tar vi kontakt!
            </CardDescription>
          </>
        }
      >
        <CardContent className="flex flex-col gap-5">
          <InterestForm />
        </CardContent>
      </PageCard>
    </PageWrapper>
  );
};

export default VolunteerPage;
