import PageWrapper from "@/components/layout/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NewsCard from "@/components/ui/news-card";
import { SimpleNewsDto } from "@/lib/api";
import Filters from "./components/filters";
import Typography from "@/components/ui/typography";
import { ParamsProps } from "@/lib/utils";
import { IFetch } from "@/lib/IFetch";
import { Suspense } from "react";
import SuspenseUI from "@/components/ui/suspense-ui";
import NewsList from "./components/news-list";
import { auth } from "@clerk/nextjs/server";

const News = async ({
  searchParams,
}: ParamsProps<{ page?: string; query?: string }>) => {
  const page = searchParams?.page ?? 0;
  const query = searchParams?.query ?? "";
  const { sessionClaims } = auth();
  const enableCreateArticle = sessionClaims?.metadata.role == "admin";

  return (
    <PageWrapper innerClassName="w-full">
      <div className="flex lg:flex-row flex-col gap-10">
        <Card className="w-full mx-auto order-2 lg:order-1">
          <NewsHeader />
          <CardContent>
            <Suspense fallback={<SuspenseUI className="h-full" />}>
              <NewsList query={query} page={page} />
            </Suspense>
          </CardContent>
        </Card>
        <Filters enableCreateArticle={enableCreateArticle} />
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
