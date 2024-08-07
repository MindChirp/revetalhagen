import PageWrapper from "@/components/layout/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SuspenseUI from "@/components/ui/suspense-ui";
import { ParamsProps } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { NewspaperIcon } from "lucide-react";
import { Suspense } from "react";
import Filters from "./components/filters";
import NewsList from "./components/news-list";

const News = async ({
  searchParams,
}: ParamsProps<{ page?: string; query?: string }>) => {
  const page = searchParams?.page ?? 0;
  const query = searchParams?.query ?? "";
  const { sessionClaims } = auth();
  const enableCreateArticle = sessionClaims?.metadata.role == "admin";

  return (
    <PageWrapper innerClassName="w-full">
      <div className="flex lg:flex-row flex-col gap-10 animate-in fade-in duration-500">
        <Card className="w-full mx-auto order-2 lg:order-1 shadow-md">
          <NewsHeader />
          <CardContent>
            <Suspense fallback={<SuspenseUI className="h-full" />}>
              <NewsList query={query} page={page as string} />
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
      <CardTitle className="text-primary-foreground flex gap-2.5">
        <NewspaperIcon /> Nyheter
      </CardTitle>
      <CardDescription className="text-primary-foreground">
        Her kan du se de siste oppdateringene fra Revetalhagen!
      </CardDescription>
    </CardHeader>
  );
};

export default News;
