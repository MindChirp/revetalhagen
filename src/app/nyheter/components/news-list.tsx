import { Card, CardHeader } from "@/components/ui/card";
import Conditional from "@/components/ui/conditional";
import NewsCard from "@/components/ui/news-card";
import Typography from "@/components/ui/typography";
import { SimpleNewsDto } from "@/lib/api";
import { isRole } from "@/lib/auth-guard";
import { IFetch } from "@/lib/IFetch";
import { currentUser } from "@clerk/nextjs/server";
import AbstractedPagination from "./abstracted-pagination";

export default async function NewsList({
  query,
  page,
}: {
  query?: string;
  page?: string;
}) {
  // Perform a query based on the provided page number
  const user = await currentUser();
  let isError: boolean = false;
  let result: SimpleNewsDto[] = [];
  try {
    result = await IFetch<SimpleNewsDto[]>({
      url: `/api/News?query=${query}&page=${page}`,
      config: {
        method: "GET",
        next: {
          tags: ["news", "page-" + page],
        },
      },
    });
  } catch (error) {
    isError = true;
    result = [];
  }
  return (
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
          canEdit={user?.id == item.publishedBy?.sub || isRole("admin")}
        />
      ))}
      {/* TODO: Create suspense with content streaming, allowing for displaying of a loading state */}
      {result.length === 0 && (
        <Card className="bg-accent shadow-none">
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
      <AbstractedPagination
        maxPagesVisible={10}
        currentPage={parseInt(page ?? "0")}
      />
    </div>
  );
}
