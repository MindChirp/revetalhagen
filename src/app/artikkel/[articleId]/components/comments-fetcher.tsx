import { IFetch } from "@/lib/IFetch";
import CommentsWrapper from "./comments-wrapper";
import { CommentDto } from "@/lib/api";

interface CommentsFetcherProps {
  articleId: number;
}

export default async function CommentsFetcher({
  articleId,
}: CommentsFetcherProps) {
  const comments = await IFetch<CommentDto[]>({
    url: `/api/Comment/articles/${articleId}`,
    config: {
      method: "GET",
      next: {
        tags: ["comments", articleId.toString?.()],
      },
    },
  }).then((res) => {
    if (Array.isArray(res)) return res;

    throw res;
  });

  return <CommentsWrapper articleId={articleId} comments={comments} />;
}
