import PageWrapper from "@/components/layout/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserAvatar from "@/components/ui/header/user-avatar";
import Typography from "@/components/ui/typography";
import { PathParams } from "@/lib/utils";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import BackButton from "@/components/ui/back-button";
import { NewsService } from "@/lib/api";

const ArticlePage = async ({ params }: PathParams<{ articleId: string }>) => {
  const { articleId } = params;
  // Fetch news info
  let article;
  try {
    article = await NewsService.getApiNews1(articleId as unknown as number);
  } catch (error) {
    console.log("Something went wrong!", error);
  }
  return (
    <PageWrapper>
      <div className="flex flex-col gap-5 relative w-fit mx-auto">
        <BackButton className="absolute -top-5 -translate-y-full" />
        <Card className="mx-auto md:w-fit w-full md:min-w-[700px]">
          <CardHeader>
            <div className="relative px-5 w-full h-56">
              <Image
                src="/roar-holt-gard.jpg"
                alt="Roat på Holt Gård"
                fill
                objectFit="cover"
                objectPosition="center"
                className="w-full h-full rounded-2xl"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full flex gap-5 items-center justify-center flex-col">
              <Typography className="text-center">{article?.title}</Typography>
              <div className="flex gap-5 w-fit items-center">
                <div className="flex gap-2.5 items-center">
                  <UserAvatar src={article?.publishedBy?.avatarUri ?? ""} />
                  <Typography
                    variant="small"
                    className="text-primary-foreground"
                  >
                    {article?.publishedBy?.fullName}
                  </Typography>
                </div>
                <div className="h-5 w-[1px] bg-primary-foreground md:block hidden" />
                <div className="flex gap-2.5 items-center">
                  <ClockIcon size={16} className="text-primary-foreground" />
                  <Typography
                    variant="small"
                    className="text-primary-foreground"
                  >
                    {format(article?.lastEdited ?? "", "dd.MM.yyyy")}
                  </Typography>
                </div>
              </div>
              <Typography
                variant="p"
                className="md:max-w-[600px] w-fit md:mx-20"
              >
                {article?.content}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default ArticlePage;
