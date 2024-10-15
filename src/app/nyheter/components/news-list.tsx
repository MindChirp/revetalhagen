import { Card, CardHeader } from "@/components/ui/card";
import Conditional from "@/components/ui/conditional";
import NewsCard from "@/components/ui/news-card";
import Typography from "@/components/ui/typography";
import { SimpleNewsDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import { hasPermissions, PERMISSIONS } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import AbstractedPagination from "./abstracted-pagination";
import NewsPagination from "./news-pagination";

export default async function NewsList({
  query,
  page,
  permissions = [],
}: {
  query?: string;
  page?: string;
  permissions?: string[];
}) {
  // Perform a query based on the provided page number
  const user = await currentUser();
  let isError: boolean = false;
  let initialData: SimpleNewsDto[] = [];
  try {
    initialData = await IFetch<SimpleNewsDto[]>({
      url: `/api/News`,
      config: {
        method: "GET",
        next: {
          tags: ["news", "page-0"],
        },
      },
    }).then((res) => {
      if ("title" in res) return res as SimpleNewsDto[];

      throw res;
    });
  } catch (error) {
    isError = true;
    initialData = [];
  }
  return (
    <div>
      {/* TODO: Create suspense with content streaming, allowing for displaying of a loading state */}
      <NewsPagination
        initialData={initialData ?? []}
        canEdit={hasPermissions(permissions, [PERMISSIONS.editArticle])}
      />
      {initialData.length === 0 && (
        <Card className="bg-accent shadow-none animate-in fade-in duration-500">
          <CardHeader>
            <Conditional render={isError}>
              <Typography className="text-center">
                En feil oppstod, og vi kunne ikke laste inn nyhetene
              </Typography>
            </Conditional>
            <Conditional render={!isError}>
              <Typography className="text-center">Ingen resultater</Typography>
            </Conditional>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
