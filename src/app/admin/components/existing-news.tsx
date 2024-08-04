import NewsCard from "@/components/ui/news-card";
import { IFetch } from "@/lib/IFetch";
import { SimpleNewsDto } from "@/lib/api";

export default async function ExistingNews() {
  const articles = await IFetch<SimpleNewsDto[]>({
    url: "/api/News",
    config: {
      method: "GET",
      next: {
        tags: ["news"],
      },
    },
  });
  return (
    <div className="gap-2.5 w-full flex flex-col">
      {articles.map((article, index) => (
        <NewsCard
          key={index}
          title={article.title ?? ""}
          description={article.shortContent ?? ""}
          author={article.publishedBy?.fullName ?? ""}
          authorImage={article.publishedBy?.avatarUri ?? ""}
          date={article.lastEdited ?? ""}
          articleId={article.id?.toString()}
          canEdit={true}
        />
      ))}
    </div>
  );
}
