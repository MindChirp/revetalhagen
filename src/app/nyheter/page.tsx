import PageWrapper from "@/components/layout/page-wrapper";
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
import { NewsService } from "@/lib/api";
import { PlusIcon } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";
import Filters from "./components/filters";
import Typography from "@/components/ui/typography";

export interface ParamsProps<T extends { [key: string]: string }> {
  searchParams?: T;
}

const News = async ({
  searchParams,
}: ParamsProps<{ page?: string; query?: string }>) => {
  const page = searchParams?.page ?? 0;
  const query = searchParams?.query ?? "";

  // Perform a query based on the provided page number
  const result = await NewsService.getApiNews(query);

  return (
    <PageWrapper innerClassName="w-full">
      <div className="flex lg:flex-row flex-col gap-10">
        <Card className="w-full mx-auto order-2 lg:order-1">
          <NewsHeader />
          <CardContent>
            <div className="flex flex-col gap-5 w-full">
              {result.map((item) => (
                <NewsCard
                  key={item.id}
                  title={item.title ?? ""}
                  description={item.shortContent ?? ""}
                  author={item.publishedBy?.fullName ?? ""}
                  authorImage={item.publishedBy?.avatarUri ?? ""}
                  date={item.lastEdited ?? ""}
                  articleId={item.id?.toString()}
                />
              ))}
              {/* TODO: Create suspense with content streaming, allowing for displaying of a loading state */}
              {result.length === 0 && (
                <Card className="bg-accent shadow-none">
                  <CardHeader>
                    <Typography className="text-center" variant="p">
                      Her var det tomt...
                    </Typography>
                  </CardHeader>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
        <Filters />
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
