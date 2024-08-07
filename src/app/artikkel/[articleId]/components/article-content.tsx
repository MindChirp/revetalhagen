import { DetailedNewsDto } from "@/lib/api";
import { isRole } from "@/lib/auth-guard";
import { IFetch } from "@/lib/IFetch";
import { currentUser } from "@clerk/nextjs/server";
import ArticlePreview from "./article-preview";

export default async function ArticleContent({
  articleId,
}: {
  articleId: string;
}) {
  const article = await IFetch<DetailedNewsDto>({
    url: `/api/News/${articleId}`,
    config: { method: "GET" },
  });

  const user = await currentUser();

  return (
    <div className="">
      <ArticlePreview
        article={article}
        adminButtons={
          user?.username === article?.publishedBy?.username || isRole("admin")
        }
      />
    </div>
  );
}
