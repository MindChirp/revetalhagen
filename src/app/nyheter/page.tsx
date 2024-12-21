import PageWrapper from "@/components/layout/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SuspenseUI from "@/components/ui/suspense-ui";
import { hasPermissions, ParamsProps, PERMISSIONS } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { NewspaperIcon, PlusIcon } from "lucide-react";
import { Suspense } from "react";
import Filters from "./components/filters";
import NewsList from "./components/news-list";
import MobileFilters from "./components/mobile-filters";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import Conditional from "@/components/ui/conditional";

const News = async ({
  searchParams,
}: ParamsProps<{ page?: string; query?: string }>) => {
  const page = searchParams?.page ?? 0;
  const query = searchParams?.query ?? "";
  const { sessionClaims } = auth();

  return (
    <PageWrapper innerClassName="w-full">
      <div className="flex lg:flex-row flex-col gap-10 animate-in fade-in duration-500">
        <Card className="w-full mx-auto order-2 lg:order-1 shadow-md">
          <NewsHeader />
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5">
              <MobileFilters className="md:hidden" />
              <Conditional
                render={hasPermissions(
                  sessionClaims?.metadata.permissions ?? [],
                  [PERMISSIONS.createArticle]
                )}
              >
                <Link
                  href={routes.ADMIN + "?page=nyheter"}
                  className="w-full md:hidden flex"
                >
                  <Button className="w-full gap-2.5">
                    <PlusIcon size={16} />
                    Opprett ny
                  </Button>
                </Link>
              </Conditional>
            </div>
            <Suspense fallback={<SuspenseUI className="h-full" />}>
              <NewsList
                query={query}
                page={page as string}
                permissions={sessionClaims?.metadata.permissions}
              />
            </Suspense>
          </CardContent>
        </Card>
        <Filters
          enableCreateArticle={hasPermissions(
            sessionClaims?.metadata.permissions ?? [],
            [PERMISSIONS.createArticle]
          )}
        />
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
