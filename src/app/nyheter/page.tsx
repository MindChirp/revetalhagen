import PageWrapper from "@/components/layout/page-wrapper";
import BackButton from "@/components/ui/back-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import NewsCard from "@/components/ui/news-card";

const News = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-5">
        <BackButton />
        <div className="flex lg:flex-row flex-col gap-10">
          <Card className="w-full mx-auto order-2 lg:order-1">
            <NewsHeader />
            <CardContent>
              <div className="flex flex-col gap-5 w-full">
                <NewsCard
                  title="Nye grønnsaker!"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                  author="Ola Nordmann"
                  authorImage="/bryggerhuset.jpg"
                  date={new Date()}
                />
                <NewsCard
                  title="Nytt styremedlem"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                  author="Ola Nordmann"
                  authorImage="/bryggerhuset.jpg"
                  date={new Date()}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="lg:w-fit w-full h-fit lg:order-2 order-1">
            <CardHeader>
              <CardTitle className="text-primary-foreground">Filtre</CardTitle>
            </CardHeader>
            <CardContent>
              <Input placeholder="Søk..." className="lg:w-72 w-full " />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
};

const NewsHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="text-primary-foreground">Nyheter</CardTitle>
      <CardDescription className="text-primary-foreground">
        Her kan du se de siste oppdateringene fra Revetalhagen!
      </CardDescription>
    </CardHeader>
  );
};

export default News;
