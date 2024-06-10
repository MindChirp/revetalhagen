import PageWrapper from "@/components/layout/page-wrapper";
import BackButton from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import NewsCard from "@/components/ui/news-card";
import { fetchNews } from "@/lib/api/news";
import { PlusIcon } from "lucide-react";

export interface ParamsProps<T extends { [key: string]: string }> {
  searchParams?: T;
}

const News = ({
  searchParams,
}: ParamsProps<{ page?: string; query?: string }>) => {
  const page = searchParams?.page ?? 0;
  const query = searchParams?.query ?? "";
  // Perform a query based on the provided page number
  const result = fetchNews({ query, page: page as number });
  // Check if the promise resolves
  result.then((data) => console.log(data));
  return (
    <PageWrapper>
      <div className="flex flex-col gap-5 relative">
        <BackButton className="absolute -top-5 -translate-y-full" />
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

          <Card className="lg:w-fit w-full h-fit lg:order-2 order-1 sticky">
            <CardHeader>
              <CardTitle className="text-primary-foreground">Filtre</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <Input placeholder="Søk..." className="lg:w-72 w-full " />
              <Button className="flex gap-2.5 w-full">
                <PlusIcon size={16} /> Ny artikkel
              </Button>
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
