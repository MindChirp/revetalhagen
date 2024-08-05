import { CardContent } from "@/components/ui/card";
import UserAvatar from "@/components/ui/header/user-avatar";
import Typography from "@/components/ui/typography";
import { DetailedNewsDto } from "@/lib/api";
import { isRole } from "@/lib/auth-guard";
import { IFetch } from "@/lib/IFetch";
import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { ClockIcon } from "lucide-react";
import AdminButtons from "./admin-buttons";
import ArticleRenderer from "./article-renderer";
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
        adminButtons={user?.id === article?.publishedBy?.sub || isRole("admin")}
      />
    </div>
  );
}
