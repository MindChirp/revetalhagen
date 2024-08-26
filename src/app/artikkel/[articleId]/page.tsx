import PageWrapper from "@/components/layout/page-wrapper";
import { Card } from "@/components/ui/card";
import SuspenseUI from "@/components/ui/suspense-ui";
import { PathParams } from "@/lib/utils";
import { Suspense } from "react";
import ArticleComments from "./components/article-comments";
import ArticleContent from "./components/article-content";
import CommentsFetcher from "./components/comments-fetcher";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/ui/loader";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@clerk/nextjs/server";

const ArticlePage = async ({ params }: PathParams<{ articleId: string }>) => {
  const { articleId } = params;
  const { sessionClaims } = auth();

  return (
    <PageWrapper innerClassName="w-full md:w-fit">
      <Card className="animate-in fade-in duration-500 mx-auto md:w-fit w-full md:min-w-[896px] max-w-4xl shadow-md pb-6">
        <Suspense fallback={<ArticleSkeleton />}>
          <ArticleContent
            articleId={articleId}
            permissions={sessionClaims?.metadata.permissions}
          />
        </Suspense>
        <Separator orientation="horizontal" className="my-6" />
        <ArticleComments articleId={articleId} />
        <Suspense
          fallback={
            <div className="w-full">
              <Loader className="mx-auto" />
            </div>
          }
        >
          <CommentsFetcher articleId={parseInt(articleId)} />
        </Suspense>
      </Card>
    </PageWrapper>
  );
};

const ArticleSkeleton = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-5 p-6">
      <Skeleton className="w-full h-40 py-10" />
      <Skeleton className="w-2/3 py-3" />
      <Skeleton className="w-3/4 py-3" />
      <Skeleton className="w-1/4 py-3" />
    </div>
  );
};

export default ArticlePage;
