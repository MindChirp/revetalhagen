import { Card, CardHeader } from "@/components/ui/card";
import NewsCard from "@/components/ui/news-card";
import Typography from "@/components/ui/typography";
import { SimpleNewsDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";

export default async function NewsList({
  query,
  page,
}: {
  query?: string;
  page?: string;
}) {
  // Perform a query based on the provided page number
  const result = await IFetch<SimpleNewsDto[]>({
    url: `/api/News?query=${query}&page=${page}`,
    config: {
      method: "GET",
    },
  });

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
  );
}
