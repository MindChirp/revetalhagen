import PageWrapper from "@/components/layout/page-wrapper";
import { Card } from "@/components/ui/card";
import { PathParams } from "@/lib/utils";
import BackButton from "@/components/ui/back-button";
import { Suspense } from "react";
import ArticleContent from "./components/article-content";
import SuspenseUI from "@/components/ui/suspense-ui";

const ArticlePage = async ({ params }: PathParams<{ articleId: string }>) => {
  const { articleId } = params;
  // Fetch news info

  return (
    <PageWrapper innerClassName="w-full md:w-fit">
      <Card className="animate-in opacity-0 direction-reverse fill-mode-both mx-auto md:w-fit w-full md:min-w-[700px]">
        <Suspense fallback={<SuspenseUI />}>
          <ArticleContent articleId={articleId} />
        </Suspense>
      </Card>
    </PageWrapper>
  );
};

export default ArticlePage;
