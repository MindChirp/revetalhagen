import PageWrapper from "@/components/layout/page-wrapper";
import { Card } from "@/components/ui/card";
import SuspenseUI from "@/components/ui/suspense-ui";
import { PathParams } from "@/lib/utils";
import { Suspense } from "react";
import ArticleComments from "./components/article-comments";
import ArticleContent from "./components/article-content";
import CommentsFetcher from "./components/comments-fetcher";

const ArticlePage = async ({ params }: PathParams<{ articleId: string }>) => {
  const { articleId } = params;

  return (
    <PageWrapper innerClassName="w-full md:w-fit">
      <Card className="animate-in fade-in duration-500 mx-auto md:w-fit w-full md:min-w-[700px] shadow-md pb-6">
        <Suspense fallback={<SuspenseUI />}>
          <ArticleContent articleId={articleId} />
        </Suspense>
        <ArticleComments articleId={articleId} />
        <CommentsFetcher articleId={parseInt(articleId)} />
      </Card>
    </PageWrapper>
  );
};

export default ArticlePage;
