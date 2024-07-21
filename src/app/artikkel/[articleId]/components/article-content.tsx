import { CardContent, CardHeader } from "@/components/ui/card";
import UserAvatar from "@/components/ui/header/user-avatar";
import Typography from "@/components/ui/typography";
import { format } from "date-fns";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import ArticleRenderer from "./article-renderer";
import { DetailedNewsDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";

export default async function ArticleContent({
  articleId,
}: {
  articleId: string;
}) {
  const article = await IFetch<DetailedNewsDto>({
    url: `/api/News/${articleId}`,
    config: { method: "GET" },
  });
  return (
    <div>
      {/* <CardHeader>
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
      </CardHeader> */}
      <CardContent className="pt-6">
        <div className="w-full flex gap-5 items-center justify-center flex-col">
          <div className="w-full h-fit bg-accent gap-5 rounded-3xl p-3 flex items-center flex-col">
            <Typography className="text-center">{article?.title}</Typography>
            <div className="flex gap-5 w-fit items-center">
              <div className="flex gap-2.5 items-center">
                <UserAvatar src={article?.publishedBy?.avatarUri ?? ""} />
                <Typography
                  variant="small"
                  className="capitalize text-primary-foreground"
                >
                  {article?.publishedBy?.fullName}
                </Typography>
              </div>
              <div className="h-5 w-[1px] bg-primary-foreground md:block hidden" />
              <div className="flex gap-2.5 items-center">
                <ClockIcon size={16} className="text-primary-foreground" />
                <Typography variant="small" className="text-primary-foreground">
                  {format(article?.lastEdited ?? "", "dd.MM.yyyy")}
                </Typography>
              </div>
            </div>
          </div>
          <ArticleRenderer article={article} />
        </div>
      </CardContent>
    </div>
  );
}
