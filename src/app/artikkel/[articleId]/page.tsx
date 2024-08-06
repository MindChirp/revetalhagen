import PageWrapper from "@/components/layout/page-wrapper";
import { Card } from "@/components/ui/card";
import { PathParams } from "@/lib/utils";
import BackButton from "@/components/ui/back-button";
import { Suspense } from "react";
import ArticleContent from "./components/article-content";
import SuspenseUI from "@/components/ui/suspense-ui";
import ArticleComments from "./components/article-comments";

const ArticlePage = async ({ params }: PathParams<{ articleId: string }>) => {
  const { articleId } = params;

  return (
    <PageWrapper innerClassName="w-full md:w-fit">
      <Card className="animate-in fade-in duration-500 mx-auto md:w-fit w-full md:min-w-[700px] shadow-md">
        <Suspense fallback={<SuspenseUI />}>
          <ArticleContent articleId={articleId} />
        </Suspense>
        <ArticleComments articleId={articleId} />
      </Card>
    </PageWrapper>
  );
};

export default ArticlePage;
