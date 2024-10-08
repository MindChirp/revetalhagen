import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import Typography from "./typography";
import { Separator } from "./separator";
import { BookIcon, BookOpenTextIcon, ClockIcon, EditIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "./button";
import UserAvatar from "./header/user-avatar";
import BackButton from "./back-button";
import Link from "next/link";
import { routes } from "@/lib/routes";
import Conditional from "./conditional";
interface NewsCardProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  author?: string;
  authorImage?: string;
  date?: string;
  articleId?: string;
  canEdit?: boolean;
}
const NewsCard = ({
  title,
  className,
  description,
  author,
  authorImage,
  articleId,
  canEdit,
  date,
  ...props
}: NewsCardProps) => {
  return (
    <Card
      className={cn(
        "shadow-sm bg-background border-[1px] border-primary border-solid",
        className
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="break-words whitespace-break-spaces text-primary-foreground">
          {title}
        </CardTitle>
        {/* <CardDescription>{description}</CardDescription> */}
        <CardContent className="p-0 pt-2.5 flex flex-col gap-5">
          <div className="flex md:flex-row flex-col gap-5 md:items-center">
            <div className="flex gap-2.5 items-center justify-start">
              <UserAvatar src={authorImage} />
              <Typography
                variant="small"
                className="capitalize text-primary-foreground"
              >
                {author}
              </Typography>
            </div>
            <div className="h-5 w-[1px] bg-primary-foreground md:block hidden" />
            <div className="flex gap-2.5 items-center">
              <ClockIcon size={16} className="text-primary-foreground" />
              <Typography variant="small" className="text-primary-foreground">
                {format(new Date(date ?? ""), "dd.MM.yyyy")}
              </Typography>
            </div>
          </div>
          <div className="flex gap-2.5">
            <Link href={`/artikkel/${articleId}`} className="md:w-fit w-full">
              <Button className="md:w-fit w-full gap-2.5 ">
                <BookOpenTextIcon size={16} />
                Les artikkel
              </Button>
            </Link>

            <Conditional render={canEdit ?? false}>
              <Link
                href={`${routes.ADMIN}?page=nyheter&articleId=${articleId}`}
              >
                <Button variant={"ghost"} className="md:w-fit w-full gap-2.5">
                  <EditIcon size={16} />
                  Rediger
                </Button>
              </Link>
            </Conditional>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default NewsCard;
