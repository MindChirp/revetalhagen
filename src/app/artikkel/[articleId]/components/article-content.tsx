import { DetailedNewsDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import { hasPermissions, PERMISSIONS } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import ArticlePreview from "./article-preview";

export default async function ArticleContent({
  articleId,
  permissions = [],
}: {
  articleId: string;
  permissions?: string[];
}) {
  const article = await IFetch<DetailedNewsDto>({
    url: `/api/News/${articleId}`,
    config: { method: "GET" },
  }).then((res) => {
    if ("title" in res) return res;

    throw res;
  });

  const user = await currentUser();

  const isOwnArticle = user?.username === article?.publishedBy?.username;
  return (
    <ArticlePreview
      article={article}
      allowDelete={
        isOwnArticle || hasPermissions(permissions, [PERMISSIONS.deleteArticle])
      }
      allowEdit={
        isOwnArticle || hasPermissions(permissions, [PERMISSIONS.editArticle])
      }
    />
  );
}
