import { CardContent } from "@/components/ui/card";
import UserAvatar from "@/components/ui/header/user-avatar";
import Typography from "@/components/ui/typography";
import { DetailedNewsDto } from "@/lib/api";
import { format } from "date-fns";
import { ClockIcon } from "lucide-react";
import ArticleRenderer from "./article-renderer";
import AdminButtons from "./admin-buttons";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface ArticlePreviewProps extends React.ComponentProps<typeof CardContent> {
  article: DetailedNewsDto;
  adminButtons?: boolean;
}
export default function ArticlePreview({
  article,
  adminButtons,
  className,
  ...props
}: ArticlePreviewProps) {
  if (!article) return undefined;
  return (
    <CardContent className={cn("pt-6 overflow-hidden", className)} {...props}>
      <div className="w-full flex gap-5 items-center justify-center flex-col">
        <div className="w-full h-fit bg-accent gap-5 rounded-3xl p-6 flex items-center flex-col">
          <Typography
            className="text-center break-words whitespace-break-spaces md:max-w-[50vw] max-w-full"
            variant="h1"
          >
            {article?.title}
          </Typography>
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
                {article?.lastEdited &&
                  format(article?.lastEdited ?? "", "dd.MM.yyyy")}
              </Typography>
            </div>
          </div>
        </div>
        <ArticleRenderer article={article} />
      </div>
      {adminButtons && <AdminButtons articleId={article?.id} />}
    </CardContent>
  );
}
